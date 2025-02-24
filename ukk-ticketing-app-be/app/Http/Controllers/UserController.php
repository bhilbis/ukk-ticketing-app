<?php

namespace App\Http\Controllers;

use App\Mail\SendStaffPassword;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
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

    public function getMy(): JsonResponse
    {
        $user = Auth::user();
        $passenger = $user->passenger; // Assuming the relationship is defined in the User model

        return response()->json([
            'message' => 'Data user berhasil ditemukan',
            'data' => [
                'user' => $user,
                'passenger' => $passenger
            ]
        ], 200);
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

    public function updateMy(Request $request) {
        try {
            $user = Auth::user();
            $levelId = $user->level_id;

            // Validasi data umum (email dan avatar)
            $request->validate([
                'email' => 'required|email|unique:users,email,' . $user->id,
                'avatar' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
                if ($user->avatar) {
                    Storage::disk('public')->delete($user->avatar);
                }
                $avatarPath = $request->file('avatar')->store('user', 'public');
                $user->avatar = $avatarPath;
            }

            $user->email = $request->email;
            $user->save();

            switch ($levelId) {
                case 1:
                    break;
                case 2:
                    $request->validate([
                        'name' => 'required|string|max:255',
                        'username' => 'required|string|unique:staff,username,' . $user->staff->id,
                    ]);
                    $user->staff->update([
                        'name' => $request->name,
                        'username' => $request->username,
                    ]);
                    break;
                case 3:
                    $request->validate([
                        'name_passenger' => 'required|string|max:255',
                        'address' => 'required|string',
                        'telp' => 'required|string',
                        'gender' => 'required|in:Laki-laki,Perempuan',
                        'birth' => 'required|date',
                    ]);

                    $user->passenger->update([
                        'name_passenger' => $request->name_passenger,
                        'address' => $request->address,
                        'telp' => $request->telp,
                        'gender' => $request->gender,
                        'birth' => $request->birth,
                    ]);
                    break;

                default:
                    throw new \Exception('Level pengguna tidak valid');
            }
            $responseData = $user->load($levelId == 2 ? 'staff' : ($levelId == 3 ? 'passenger' : []));

            return response()->json([
                'message' => 'Data berhasil diupdate',
                'data' => $responseData,
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function updateUser(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'sometimes|string|min:8',
            'level_id' => 'sometimes|int|in:1,2,3',
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
        $hashedPassword = bcrypt($randomPassword);
        return DB::transaction(function () use ($validated, $randomPassword, $hashedPassword) {
            $user = User::create([
                'name' => $validated['username'],
                'email' => $validated['email'],
                'password' => $hashedPassword,
                'level_id' => $validated['level_id'],
            ]);

            Staff::create([
                'user_id' => $user->id,
                'username' => $validated['username'],
                'name' => $validated['name'],
                'email' => $validated['email'],
                'level_id' => $validated['level_id'],
                'password' => $hashedPassword,
            ]);

            Mail::to($user->email)->send(new SendStaffPassword($user, $randomPassword));

            return response()->json([
                'message' => 'Akun berhasil ditambahkan, password telah dikirim ke email',
                'data' => $user
            ], 201);
        });
    }

    public function deleteUser($id): JsonResponse
    {
        $user = User::findOrFail($id);
        if ($user->level_id == 1) {
            return response()->json([
                'message' => 'Super Admin tidak dapat dihapus.'
            ], 403);
        }
        $user->delete();

        return response()->json([
            'message' => 'Data user berhasil dihapus',
            'data' => $user
        ], 200);
    }

}
