<?php

namespace App\Http\Controllers;

use App\Models\ResetCodePassword;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;
use App\Models\User;

class PasswordResetController extends Controller
{
    public function ValidationForgotPassword(Request $request)
    {
        try {
            $email_validation = $request->validate([
                'email' => 'required|email|exists:users,email',
            ]);

            ResetCodePassword::where('email', $request->email)->forceDelete();

            // Generate 4 number characters
            $code = (string) rand(1000, 9999);

            // Set expiration time (e.g., 15 minutes from now)
            $expiration = now()->addMinutes(15);

            // Insert or update the reset_code_passwords table
            ResetCodePassword::updateOrCreate(
                [
                    'email' => $request->email,
                    'code' => $code,
                    'expired_at' => $expiration,
                ]
            );

            # send email
            // Email::dispatch('email', ['code' => $code], $request->email);
            Mail::to($request->email)->send(new ResetPasswordMail($code, $request->email));

            # return response
            return [
                'valid' => true,
                'message' => 'Kode Terkirim, Silahkan cek email anda'
            ];
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Email tidak ditemukan',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function ResendValidationForgotPassword(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|exists:users,email',
            ]);

            // force delete code
            ResetCodePassword::where('email', $request->email)->forceDelete();

            // Generate 4 number characters
            $code = (string) rand(1000, 9999);

            // Set expiration time (e.g., 15 minutes from now)
            $expiration = now()->addMinutes(15);

            // Insert or update the reset_code_passwords table
            ResetCodePassword::updateOrCreate(
                [
                    'email' => $request->email,
                    'code' => $code,
                    'expired_at' => $expiration,
                ]
            );

            # send email
            // Email::dispatch('email', ['code' => $code], $request->email);
            Mail::to($request->email)->send(new ResetPasswordMail($code, $request->email));

            # return response
            return [
                'message' => 'Code resend successfully',
            ];
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to resend code',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function codeValidationForgotPassword(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|exists:users,email',
            ]);

            $resetRecordEmail = ResetCodePassword::where('email', $request->email);
            if ($resetRecordEmail->count() == 0) {
                throw new ModelNotFoundException('Invalid email');
            }

            # increment used time all record of this email
            $resetRecordEmail->increment('used_time');

            # check used time
            if ($resetRecordEmail->first()->used_time >= 5) {
                $resetRecordEmail->forceDelete();
                throw new ModelNotFoundException('Too many request for this code, please resend code');
            }

            # some validations
            $request->validate([
                'email' => ['required', 'email'],
                'code' => ['required', 'string', 'max:4']
            ]);

            # get reset code
            $resetRecord = ResetCodePassword::where('email', $request->email)
                ->where('code', $request->code)
                ->first();

            # check reset code
            if (!$resetRecord) {
                $resetRecordEmail = ResetCodePassword::where('email', $request->email);
                if ($resetRecordEmail->count() == 0) {
                    throw new ModelNotFoundException('Invalid email');
                }
                throw new ModelNotFoundException('Invalid code');
            }

            if ($resetRecord->expired_at < now()) {
                $resetRecord->forceDelete();
                throw new ModelNotFoundException('Code expired');
            }

            # update used time
            $resetRecord->update(['used_time' => 0]);

            # return response
            return [
                'valid' => true,
                'message' => 'Code is valid'
            ];

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to validate code',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function resetPasswordForgotPassword(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|exists:users,email',
            ]);

            $resetRecordEmail = ResetCodePassword::where('email', $request->email);
            if ($resetRecordEmail->count() == 0) {
                throw new ModelNotFoundException('Invalid email');
            }

            # increment used time all record of this email
            $resetRecordEmail->increment('used_time');

            # check used time
            if ($resetRecordEmail->first()->used_time >= 5) {
                $resetRecordEmail->forceDelete();
                throw new ModelNotFoundException('Too many request for this code, please resend code');
            }

            # some validations
            $request->validate([
                'email' => ['required', 'email'],
                'code' => ['required', 'string', 'max:4'],
            ]);

            # get reset code
            $resetRecord = ResetCodePassword::where('email', $request->email)
                ->where('code', $request->code)
                ->first();

            if ($resetRecord->used_time > 5) {
            $resetRecord->forceDelete();
            throw new ModelNotFoundException('Code used too many times, please resend code');
            }

            # check reset code
            if (!$resetRecord) {
                throw new ModelNotFoundException('Invalid code');
            }
            if ($resetRecord->expired_at < now()) {
                throw new ModelNotFoundException('Code expired');
            }

            # update used time
            $user_detail = User::where('email', $request->email)->first();
            if (!$user_detail)
                throw new ModelNotFoundException('User not found');
            $user_detail->update(['password' => Hash::make($request->password)]);

            # delete reset code
            $resetRecord->forceDelete();

            # return response
            return [
                'message' => 'Password updated', 
            ];
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to reset password',
                'error' => $e->getMessage()
            ], 400);
        }
    }
}
