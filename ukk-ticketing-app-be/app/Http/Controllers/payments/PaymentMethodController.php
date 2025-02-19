<?php

namespace App\Http\Controllers\payments;

use App\Http\Controllers\Controller;
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
        $user = JWTAuth::user();

        $countEwallet = PaymentMethod::where('user_id', $user->id)->where('type', 'e-wallet')->count();
        $countBank = PaymentMethod::where('user_id', $user->id)->where('type', 'bank_transfer')->count();
        $countCreditCard = PaymentMethod::where('user_id', $user->id)->where('type', 'credit_card')->count();

        $existingEwallets = PaymentMethod::where('user_id', $user->id)->where('type', 'e-wallet')->pluck('bank_name')->toArray();
        $existingBanks = PaymentMethod::where('user_id', $user->id)->where('type', 'bank_transfer')->pluck('bank_name')->toArray();

        $validated = $request->validate([
            'type' => [
                'required',
                'in:credit_card,bank_transfer,e-wallet',
                function ($value, $fail) use ($countEwallet, $countBank, $countCreditCard) {
                    if ($value === 'e-wallet' && $countEwallet >= 3) {
                        $fail('You can only have a maximum of 3 e-wallet accounts.');
                    }
                    if ($value === 'bank_transfer' && $countBank >= 2) {
                        $fail('You can only have a maximum of 2 bank accounts.');
                    }
                    if ($value === 'credit_card' && $countCreditCard >= 1) {
                        $fail('You can only have 1 credit card.');
                    }
                },
            ],
    
            'account_number' => [
                'required',
                'string',
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->type === 'e-wallet' && !preg_match('/^\d{10,13}$/', $value)) {
                        $fail('E-wallet account number must be 10-13 digits.');
                    }
                    if ($request->type === 'credit_card' && !preg_match('/^\d{16,19}$/', $value)) {
                        $fail('Credit card number must be 16-19 digits.');
                    }
                },
            ],
    
            'bank_name' => [
                'nullable',
                'string',
                'required_if:type,bank_transfer,e-wallet',
                function ($attribute, $value, $fail) use ($request, $existingEwallets, $existingBanks) {
                    if ($request->type === 'e-wallet' && in_array($value, $existingEwallets)) {
                        $fail("You already have an e-wallet account for {$value}. Please update it instead.");
                    }
                    if ($request->type === 'bank_transfer' && in_array($value, $existingBanks)) {
                        $fail("You already have a bank account for {$value}. Please update it instead.");
                    }
                },
            ]
        ]);
    
    
        
        if ($user->level_id == 3) {
            $validated['user_id'] = $user->id;
        }
    
        $paymentMethod = PaymentMethod::create($validated);
    
        return response()->json([
            'message' => 'Metode pembayaran berhasil ditambahkan',
            'data' => $paymentMethod
        ], 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'type' => 'required|in:credit_card,bank_transfer,e-wallet,cash',
    
            'account_number' => [
                'nullable',
                'string',
                'required_if:type,bank_transfer,e-wallet,credit_card', // ✅ Ensures required fields for certain types
                'regex:/^\d{16,19}$/', // ✅ Validates 16-19 digits for credit cards
            ],
    
            'bank_name' => [
                'nullable',
                'string',
                'required_if:type,bank_transfer', // ✅ Required only when type is 'bank_transfer'
            ]
        ]);

        $user = JWTAuth::user();

        if ($user->level_id == 3) {
            $validated['user_id'] = $user->id;
        }

        $paymentMethod = PaymentMethod::findOrFail($id);
        $paymentMethod->update($validated);

        return response()->json([
            'message' => 'Metode pembayaran berhasil diperbarui',
            'data' => $paymentMethod
        ], 200);
    }

    public function destroy($id): JsonResponse
    {
        $user = JWTAuth::user();

        $paymentMethod = PaymentMethod::where('user_id', $user->id)->findOrFail($id);
        $paymentMethod->delete();
        return response()->json([
            'message' => 'Metode pembayaran berhasil dihapus'
        ], 200);
    }
}