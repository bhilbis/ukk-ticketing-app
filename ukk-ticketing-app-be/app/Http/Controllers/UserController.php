<?php

namespace App\Http\Controllers;

use App\Mail\SendStaffPassword;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function getAllUser(): JsonResponse
    {
        return response()->json([
            'message' => 'Data user berhasil ditemukan',
            'data' => User::all()
        ], 200);
    }

    public function getUserById($id): JsonResponse
    {
        return response()->json([
            'message' => 'Data user berhasil ditemukan',
            'data' => User::findOrFail($id)
        ], 200);
    }

    public function updateUser(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'sometimes|string|min:8',
            'role' => 'sometimes|string|in:Super Admin,Staff,Passenger',
        ]);
    
        $user = User::findOrFail($id);
        $user->update($validated);

        return response()->json([
            'message' => 'Data user berhasil diupdate',
            'data' => $user
        ], 200);
    }

    public function createStaff(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:50|unique:staff,username|unique:users,name',
            'email' => 'required|email|unique:users',
            'level_id' => 'required|exists:levels,id',
        ]);

        $randomPassword = Str::random(rand(8, 10));

        return DB::transaction(function () use ($validated, $randomPassword) {
            $user = User::create([
                'name' => $validated['username'],
                'email' => $validated['email'],
                'password' => bcrypt($randomPassword),
                'level_id' => $validated['level_id'],
            ]);

            Staff::create([
                'user_id' => $user->id,
                'username' => $validated['username'],
                'name' => $validated['name'],
                'email' => $validated['email'],
                'level_id' => $validated['level_id'],
                'password' => bcrypt($randomPassword),
            ]);

            Mail::to($user->email)->send(new SendStaffPassword($user, $randomPassword));

            return response()->json([
                'message' => 'Akun berhasil ditambahkan, password telah dikirim ke email',
                'data' => $user
            ], 201);
        });
    }

}