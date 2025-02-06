<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;

class BookingController extends Controller
{
    // buat super admin
    public function index(): JsonResponse
    {
        try {
            $bookings = Booking::with(['passenger', 'route.transport', 'payment'])->get();
            return response()->json([
                'message' => 'Data booking berhasil ditemukan',
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
        $user = Auth::user();
        $bookings = Booking::where('passenger_id', $user->id)->get();

        return response()->json([
            'message' => 'Data booking berhasil ditemukan',
            'data' => $bookings
        ], 201);
    }

    //for user to create booking 
    public function store(Request $request): JsonResponse
    {
        // $validated = $request->validate([
        //     'booking_code' => 'required|string|max:50|unique:bookings,booking_code', //make this to automatically generate according to the ordered train or plane
        //     'passenger_id' => 'required|exists:users,id', //make this to automatically get the user id
        //     'booking_date' => 'required|date', //make this to automatically get the current date
        //     'booking_place' => 'required|string|max:100', //make this to automatically get the location booking
        //     'seat_code' => 'required|string', 
        //     'route_id' => 'required|exists:routes,id', //make this to automatically get the route from route table
        //     'destination' => 'required|string|max:100', //make this to automatically get the destination from route table
        //     'departure_date' => 'required|date', 
        //     'check_in_time' => 'required|date_format:H:i',
        //     'departure_time' => 'required|date_format:H:i',
        //     'booking_status' => 'required|in:pending,confirmed,cancelled,completed',
        //     'payment_status' => 'required|in:paid,unpaid,refunded',
        //     'total_payment' => 'required|numeric',
        //     'staff_id' => 'required|exists:staff,id'
        // ]);

        $validated = Validator::make($request->all(), [
            'passenger_id' => 'required|exists:passengers,id',
            'route_id' => 'required|exists:routes,id',
            'seat_code' => 'required|string|max:10',
            'departure_date' => 'required|date',
            'booking_status' => 'required|in:pending,confirmed,cancelled,completed',
            'payment_status' => 'required|in:paid,unpaid,refunded',
            'total_payment' => 'required|numeric',
            'staff_id' => 'required|exists:staff,id'
        ]);

        if ($validated->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validated->errors()
            ], HttpFoundationResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $bookingData = $request->all();
            $bookingData['booking_code'] = 'BK-' . strtoupper(uniqid());
            $bookingData['booking_date'] = now()->toDateString();
            
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
