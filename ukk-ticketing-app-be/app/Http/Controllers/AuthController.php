<?php

namespace App\Http\Controllers;

use App\Models\Passenger;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'name' => 'required',
            'password' => 'required',
        ]);

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Username atau password salah',
                ], 401);
            }
        } catch (JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tidak bisa membuat Token',
            ], 500);
        }

        $user = Auth::user();

        return response()->json([
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => [
                'username' => $user->name,
                'role' => $user->role,
                'email' => $user->email,
            ],
        ], 201);
    }

    public function register(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'username' => 'required|unique:passengers,username',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6|confirmed',
                'name_passenger' => 'required|string',
                'address' => 'required|string',
                'telp' => 'required|numeric',
                'gender' => 'required|in:Laki-laki,Perempuan',
                'birth' => 'required|date',
            ]);
    
            
            $validatedData['password'] = Hash::make($validatedData['password']);
    
            
            $user = User::create([
                'name' => $validatedData['username'],
                'password' => $validatedData['password'],
                'email' => $validatedData['email'],
                'role' => 'Passenger',
            ]);

            $validatedData['user_id'] = $user->id;
    
            Passenger::create([
                'user_id' => $user->id,
                'username' => $validatedData['username'],
                'email' => $validatedData['email'],
                'password' => $validatedData['password'],
                'name_passenger' => $validatedData['name_passenger'],
                'address' => $validatedData['address'],
                'telp' => $validatedData['telp'],
                'gender' => $validatedData['gender'],
                'birth' => $validatedData['birth'],
            ]);
    
            return response()->json([
                'message' => 'Registrasi berhasil',
                'user' => [
                    'username' => $user->name,
                    'role' => $user->role,
                    'email' => $user->email,
                ],
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function logout() {
        Auth::logout();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function refresh() {
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            return response()->json([
                'status' => 'success',
                'token' => $newToken,
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Could not refresh token',
            ], 500);
        }
    }

    public function createStaff(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'level_id' => 'required|exists:levels,id',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => 'Staff',
        ]);

        Staff::create([
            'user_id' => $user->id,
            'level_id' => $validated['level_id'],
        ]);

        return response()->json(['message' => 'Akun staff berhasil dibuat']);
    }
}
