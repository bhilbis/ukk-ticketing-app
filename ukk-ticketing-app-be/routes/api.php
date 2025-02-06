<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\transport\TransportClassController;
use App\Http\Controllers\transport\TransportController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;

// 🟢 Group Authentication (Tanpa Autentikasi)
Route::prefix('auth')->group(function () {
    //not authenticated
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    
    //reset
    Route::post('forgot-password', [PasswordResetController::class, 'validationForgotPassword']); //send code
    Route::post('resend-code', [PasswordResetController::class, 'resendValidationForgotPassword']); //resend code (opsional)
    Route::post('validate-code', [PasswordResetController::class, 'codeValidationForgotPassword']); //validation code
    Route::post('reset-password', [PasswordResetController::class, 'resetPasswordForgotPassword']); //confirmation reset password

    // 🔒 Hanya bisa diakses jika sudah login
    Route::middleware(['auth:api'])->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });
});


//bagian testing
Route::prefix('testing')->group(function () {
    // Route::prefix('users')->group(function () {
    //     Route::get('/', [UserController::class, 'getAllUser']);
    //     Route::get('/{id}', [UserController::class, 'getUserById']);
    //     Route::put('/{id}', [UserController::class, 'updateUser']);
    //     Route::post('/create-staff', [UserController::class, 'createStaff']);
    // });
});



//middleWare access ( authenticated) 
Route::middleware(['auth:api'])->group(function () {

    // 🟡 Group untuk (Super Admin Only)
    Route::middleware(['role:Super Admin'])->group(function () {
        //routes users
        Route::prefix('users')->group(function () {
            Route::get('/', [UserController::class, 'getAllUser']);
            Route::get('/{id}', [UserController::class, 'getUserById']);
            Route::put('/{id}', [UserController::class, 'updateUser']);
            Route::post('/create-staff', [UserController::class, 'createStaff']);
        });


        Route::prefix('transport')->group(function () {
            Route::apiResource('', TransportController::class);
        });

    });

    // 🟠 Group untuk (Staff & Super Admin)
    Route::middleware(['role:Staff,Super Admin'])->group(function () {

        Route::prefix('transport-classes')->group(function () {
            Route::apiResource('', TransportClassController::class);  
        });

    });

    // 🔵 Passenger Only
    Route::prefix('passenger')->middleware(['role:Passenger'])->group(function () {
        
    });
});
