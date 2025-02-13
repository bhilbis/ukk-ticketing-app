<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class PaymentMethodController extends Controller
{
    public function index(): JsonResponse
    {
        $user = JWTAuth::user();

        $paymentMethods = PaymentMethod::with('user')->where('user_id', $user->id)->whereHas('user', function ($query) {
            $query->where('level_id', 3);
        })->get();

        return response()->json([
            'message' => 'Data metode pembayaran berhasil ditemukan',
            'data' => $paymentMethods
        ], 200);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'type' => 'required|in:credit_card,bank_transfer,e_wallet,cash',
            'account_number' => 'nullable|string',
            'bank_name' => 'nullable|string',
        ]);

        $paymentMethod = PaymentMethod::create($validated);

        return response()->json([
            'message' => 'Metode pembayaran berhasil ditambahkan',
            'data' => $paymentMethod
        ], 201);
    }
}
