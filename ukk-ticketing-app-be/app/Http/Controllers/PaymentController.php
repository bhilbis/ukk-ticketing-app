<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Passenger;
use App\Models\Payment;
use App\Models\PaymentMethod;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class PaymentController extends Controller
{
    public function index($userId): JsonResponse
    {
        // $payments = Payment::with(['booking.passenger', 'user'])->get();
        $payments = Payment::whereHas('passenger', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();

        return response()->json([
            'message' => 'Data pembayaran berhasil ditemukan',
            'data' => $payments
        ], 200);
    }

    public function show($id): JsonResponse
    {
        $payment = Payment::where('booking_id', $id)->with(['booking', 'user'])->first();

        if (!$payment) {
            return response()->json(['message' => 'Pembayaran tidak ditemukan'], 404);
        }

        return response()->json([
            'message' => 'Detail pembayaran ditemukan',
            'data' => $payment
        ], 200);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'transaction_id' => 'nullable|string',
        ]);

        try {
            $booking = Booking::findOrFail($validated['booking_id']);
            $passenger = Passenger::where('id', $booking->passenger_id)->firstOrFail();
            if ($booking->payment_status === 'paid') {
                return response()->json(['message' => 'Booking sudah dibayar'], 400);
            }

            $paymentMethod = PaymentMethod::where('id', $validated['payment_method_id'])
            ->where('user_id', $passenger->user_id)
            ->firstOrFail();

            $payment = Payment::create([
                'booking_id' => $validated['booking_id'],
                'passenger_id' => JWTAuth::id(),
                'amount' => $validated['amount'],
                'payment_method' => $paymentMethod->type,
                'payment_status' => 'paid',
                'transaction_id' => $validated['transaction_id'] ?? null,
            ]);

            // Update status booking ke completed
            $booking->update([
                'payment_status' => 'paid',
                'booking_status' => 'completed',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Pembayaran berhasil',
                'data' => $payment
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage()
            ], 500);
        }
    }

    public function delete($id): JsonResponse
    {
        $payment = Payment::findOrFail($id);
        $payment->delete();

        return response()->json([
            'message' => 'Pembayaran berhasil dihapus',
        ], 200);
    }
}
