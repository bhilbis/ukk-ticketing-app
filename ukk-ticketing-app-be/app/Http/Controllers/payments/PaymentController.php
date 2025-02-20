<?php

namespace App\Http\Controllers\payments;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Passenger;
use App\Models\Payment;
use App\Models\PaymentMethod;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class PaymentController extends Controller
{
    public function getAll(): JsonResponse
    {
        $payments = Payment::with(['booking', 'passenger'])->get();

        return response()->json([
            'message' => 'Seluruh Data pembayaran berhasil ditemukan',
            'data' => $payments
        ], 200);
    }

    public function index(): JsonResponse
    {
        $userId = Auth::id();

        $payments = Payment::whereHas('passenger', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();

        if ($payments->count() == 0) {
            return response()->json([
                'message' => 'Belum melakukan Pembayaran',
                'data' => []
            ], 200);
        }

        return response()->json([
            'message' => 'Data pembayaran berhasil ditemukan',
            'data' => $payments
        ], 200);
    }

    public function show($id): JsonResponse
    {
        $userId = JWTAuth::user();

        $payment = Payment::where('id', $id)->whereHas('passenger', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->first();

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
        $user = Auth::user(); // Get logged-in user

        // ✅ Restrict to level_id == 3
        if ($user->level_id != 3) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: You are not allowed to make payments.'
            ], 403);
        }

        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'amount' => 'required|numeric|min:0',
        ]);

        try {
            $booking = Booking::findOrFail($validated['booking_id']);
            $passenger = Passenger::where('id', $booking->passenger_id)->firstOrFail();
            // $passenger = Passenger::with('booking')->where('user_id', $user->id)->first();

            // ✅ Prevent paying for someone else's booking
            if ($passenger->user_id !== $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'You can only pay for your own bookings.'
                ], 403);
            }

            // ✅ Prevent double payment
            if ($booking->payment_status === 'paid') {
                return response()->json([
                    'success' => false,
                    'message' => 'Booking has already been paid.'
                ], 400);
            }

            if ($validated['amount'] != $booking->total_payment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid payment amount. The amount must match the total booking price.'
                ], 400);
            }

            $paymentMethod = PaymentMethod::where('id', $validated['payment_method_id'])
                ->where('user_id', $user->id)
                ->firstOrFail();
            if (!$paymentMethod) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid or unauthorized payment method.'
                ], 400);
            }

            $transactionId = match ($paymentMethod->type) {
                'bank_transfer' => substr($paymentMethod->bank_name ?? 'BNK', 0, 3),
                'e-wallet' => match ($paymentMethod->bank_name) {
                    'Dana' => 'DND',
                    'Gopay' => 'GPY',
                    'Ovo' => 'OVO',
                    default => 'EWL'
                },
                'credit_card' => 'CC',
                'cash' => 'CSH',
                default => 'TRX'
            };
            do {
                $randomNumber = rand(1000, 9999);
                $finalTransactionId = $transactionId . $randomNumber;
            } while (Payment::where('transaction_id', $finalTransactionId)->exists());

            // ✅ Create payment
            $payment = Payment::create([
                'booking_id' => $validated['booking_id'],
                'passenger_id' => $passenger->id,
                'amount' => $validated['amount'],
                'payment_method' => $paymentMethod->type,
                'payment_status' => 'paid',
                'transaction_id' => $finalTransactionId ,
            ]);

            // ✅ Update booking status
            $booking->update([
                'payment_status' => 'paid',
                'booking_status' => 'confirmed',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Payment successful.',
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
