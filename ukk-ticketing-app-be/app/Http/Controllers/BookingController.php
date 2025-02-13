<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Passenger;
use App\Models\Routes;
use App\Models\Transports;
use Carbon\Carbon;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
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

    public function getBookingByStaff(): JsonResponse
    {
        $staffId = JWTAuth::id();
        $booking = Booking::where('staff_id', $staffId)->with('passenger')->get();

        return response()->json([
            'message' => 'Data booking yang ditangani staff ditemukan',
            'data' => $booking
        ], 200);
    }

    //for user to create booking 
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'route_id' => 'required|exists:routes,id',
            'seat_code' => 'required|string', 
            'departure_date' => 'required|date',
            'departure_time' => 'required|date_format:H:i',
            'total_payment' => 'required|string',
            'staff_id' => 'nullable|exists:staff,id'
        ]);

        try {
            $route = Routes::findOrFail($validated['route_id']);
            $transport = Transports::findOrFail($route->transport_id);
            $transportType = $transport->type;

            // Format kode booking: TRANS-SR-END-XXXXXX
            $transportCode = '';
            if ($transportType->type_name === 'Kereta Api') {
                $transportCode = 'KA';
            } elseif ($transportType->type_name === 'Pesawat') {
                $transportCode = 'PS';
            } else {
                $transportCode = strtoupper(substr($transportType->type_name, 0, 2)); // Default to first 2 characters
            } // Contoh: KER, PES 
            $startCode = strtoupper(substr($route->start_route, 0, 3)); // Contoh: JAK
            $endCode = strtoupper(substr($route->end_route, 0, 3)); // Contoh: SUB
            $uniqueCode = strtoupper(substr(md5(uniqid()), 0, 3)); // Kode unik 6 karakter

            $bookingCode = "{$transportCode}-{$startCode}{$endCode}-{$uniqueCode}";

            $departureTime = Carbon::createFromFormat('H:i', $validated['departure_time'] ?? '00:00');
            $checkInTime = $departureTime->subHours(2)->format('H:i'); // Check-in 2 jam sebelum keberangkatan

            // mengecek user id yang sesuai
            $userId = Auth::id();
            $passenger = Passenger::where('user_id', $userId)->first();
            
            $bookingData = $request->all();
            $bookingData['passenger_id'] = $passenger->id;
            $bookingData['booking_code'] = $bookingCode;
            $bookingData['booking_date'] = now()->toDateString();
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
        $booking = Booking::findOrfail($id);
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
