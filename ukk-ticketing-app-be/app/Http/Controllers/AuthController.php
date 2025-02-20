<?php

namespace App\Http\Controllers;

use App\Models\Levels;
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
            'email' => 'required|email',
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

        $user = JWTAuth::user();

        if (!$token = JWTAuth::claims([
            'level_id' => Auth::user()->level_id
        ])->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => $user,
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
                'name' => $validatedData['name_passenger'],
                'password' => $validatedData['password'],
                'email' => $validatedData['email'],
                'level_id' => 3,
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

            $user = User::with('level')->find($user->id);

            return response()->json([
                'message' => 'Registrasi berhasil',
                'user' => [
                    'username' => $user->name,
                    'level_id' => $user->level_id,
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

    public function updatePassword(Request $request) {
        try {
            $user = Auth::user();
            $request->validate([
                'old_password' => 'required',
                'password' => 'required|confirmed|min:6',
            ]);

            if (!Hash::check($request->old_password, $user->password)) {
                return response()->json([
                    'message' => 'Password lama tidak sesuai',
                ], 400);
            }

            $user->password = Hash::make($request->password);
            $user->save();

            return response()->json([
                'message' => 'Password berhasil diupdate',
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
            $newToken = JWTAuth::parseToken()->refresh();
            return $this->respondWithToken($newToken);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' =>  'Gagal Memperbarui token' . $e->getMessage(),
            ], 401);
        }
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            // 'expires_in' => config('jwt.ttl') * 60
            'expires_in' => JWTAuth::factory()->getTTL() * 60
        ]);
    }
}
