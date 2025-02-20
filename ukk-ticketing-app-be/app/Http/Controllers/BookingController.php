<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Passenger;
use App\Models\Routes;
use App\Models\Transports;
use App\Models\TransportSchedule;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;
use Tymon\JWTAuth\Facades\JWTAuth;

class BookingController extends Controller
{
    // buat super admin
    public function index(): JsonResponse
    {
        try {
            $bookings = Booking::with(['passenger', 'route.transport', 'payment'])->get();
            return response()->json([
                'message' => 'Data seluruh booking berhasil ditemukan',
                'data' => $bookings
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data booking',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    //for user to check his bookings
    public function getMyBookings(): JsonResponse
    {
        $user = JWTAuth::user();
        $passenger = Passenger::with('booking')->where('user_id', $user->id)->first();

        return response()->json([
            'message' => 'Data booking Anda berhasil ditemukan',
            'data' => $passenger->booking,
        ], 200);
    }

    //belum bisa digunakan karena seluruh data staff akan null
    public function getBookingByStaff(): JsonResponse
    {
        $user = JWTAuth::user();

        if ($user->level_id !== 2) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $booking = Booking::where('staff_id', $user->id)->with('passenger')->get();

        return response()->json([
            'message' => 'Data booking yang ditangani staff ditemukan',
            'data' => $booking
        ], 200);
    }

    public function getUnpaidBookings(): JsonResponse
    {
        $user = JWTAuth::user(); // Get logged-in user

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $unpaidBookings = Booking::whereHas('passenger', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->where('payment_status', 'unpaid')->get();

        if ($unpaidBookings->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No unpaid bookings found.',
                'data' => []
            ], 200);
        }

        return response()->json([
            'success' => true,
            'message' => 'Unpaid bookings retrieved successfully.',
            'data' => $unpaidBookings
        ], 200);
    }

    public function getPaidBookings(): JsonResponse
    {
        $user = JWTAuth::user(); // Get logged-in user

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $paidBookings = Booking::whereHas('passenger', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->where('payment_status', 'paid')->get();

        if ($paidBookings->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No paid bookings found.',
                'data' => []
            ], 200);
        }

        return response()->json([
            'success' => true,
            'message' => 'Paid bookings retrieved successfully.',
            'data' => $paidBookings
        ], 200);
    }

    public function validatePayment($id): JsonResponse
    {
        try {
            DB::beginTransaction();

            $booking = Booking::findOrFail($id);

            // Validasi status saat ini
            if ($booking->payment_status !== 'paid') {
                return response()->json([
                    'success' => false,
                    'message' => 'Booking belum dibayar'
                ], 400);
            }

            if ($booking->booking_status === 'completed') {
                return response()->json([
                    'success' => false,
                    'message' => 'Booking sudah selesai'
                ], 400);
            }

            // Update status
            $booking->update([
                'booking_status' => 'completed',
                'completed_at' => now()
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Validasi pembayaran berhasil',
                'data' => $booking
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal validasi pembayaran',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    //for user to create booking
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'route_id' => 'required|exists:routes,id',
            'seat_code' => 'required|string',
            'total_payment' => 'required|string',
            'staff_id' => 'nullable|exists:staff,id'
        ]);

        try {
            $route = Routes::findOrFail($validated['route_id']);
            $transport = Transports::findOrFail($route->transport_id);
            $transportType = $transport->type;

            // Mendapatkan jadwal terbaru
            $schedule = TransportSchedule::whereHas('routes', function ($query) use ($route) {
                $query->where('routes.id', $route->id);
            })->latest()->first();

            if (!$schedule) {
                return response()->json([
                    'success' => false,
                    'message' => 'Jadwal tidak ditemukan untuk rute ini'
                ], 404);
            }

            $isSeatTaken = Booking::where('route_id', $route->id)
                ->where('transport_id', $transport->id)
                ->where('departure_time', $schedule->departure_time)
                ->where('seat_code', $validated['seat_code'])
                ->exists();

            if ($isSeatTaken) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kursi sudah dipesan'
                ], 400);
            };

            $departureDate = $schedule->departure_date;
            $departureTime = $schedule->departure_time;

            // Format kode booking: TRANS-SR-END-XXXXXX
            $transportCode = match ($transportType->type_name) {
                'Kereta Api' => 'KA',
                'Pesawat' => 'PS',
                default => strtoupper(substr($transportType->type_name, 0, 2))
            }; // Contoh: KER, PES
            $startCode = strtoupper(substr($route->start_route, 0, 3)); // Contoh: JAK
            $endCode = strtoupper(substr($route->end_route, 0, 3)); // Contoh: SUB
            $uniqueCode = strtoupper(substr(md5(uniqid()), 0, 3)); // Kode unik 6 karakter
            $bookingCode = "{$transportCode}-{$startCode}{$endCode}-{$uniqueCode}";

            $checkInTime = Carbon::parse($departureTime)->subHours(2)->format('H:i'); // Check-in 2 jam sebelum keberangkatan

            // mengecek user id yang sesuai
            $userId = auth('api')->id();

            $passenger = Passenger::where('user_id', $userId)->first();
            if (!$passenger) {
                return response()->json(['success' => false, 'message' => 'Penumpang tidak ditemukan'], 404);
            }
            $bookingData = $request->all();
            $bookingData['passenger_id'] = $passenger->id;
            $bookingData['booking_code'] = $bookingCode;
            $bookingData['booking_date'] = now()->toDateString();
            $bookingData['departure_date'] = $departureDate;
            $bookingData['departure_time'] = $departureTime;
            $bookingData['booking_place'] = "Online/Web"; // Lokasi booking default
            $bookingData['destination'] = $route->destination;
            $bookingData['check_in_time'] = $checkInTime; // Check-in 2 jam sebelum keberangkatan
            $bookingData['booking_status'] = 'pending';
            $bookingData['payment_status'] = 'unpaid';
            $bookingData['staff_id'] = $request->staff_id ?? null;

            $booking = Booking::create($bookingData);

            return response()->json([
                'success' => true,
                'data' => $booking,
                'message' => 'Booking created successfully'
            ], HttpFoundationResponse::HTTP_CREATED);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage()
            ], HttpFoundationResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function CancelBooking($id): JsonResponse
    {
        $user = JWTAuth::user();

        $booking = Booking::findOrFail($id);

        if ($booking->passenger->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'You can only cancel your own booking.'
            ], 403);
        }

        if ($booking->booking_status === 'cancelled') {
            return response()->json([
                'success' => false,
                'message' => 'Booking already cancelled.'
            ], 400);
        }

        $booking->update([
            'booking_status' => 'cancelled'
        ]);

        return response()->json([
            'message' => 'Booking berhasil Dibatalkan',
            'data' => $booking
        ], 201);
    }

    public function deleteBooking($id): JsonResponse
    {
        try {
            Booking::findOrfail($id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Booking berhasil dihapus',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage()
            ], HttpFoundationResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
