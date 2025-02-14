<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\transport\TransportClassController;
use App\Http\Controllers\transport\TransportController;
use App\Http\Controllers\transport\TransportScheduleController;
use App\Http\Controllers\transport\TransportTypeController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
    
    Route::middleware(['jwt.auth'])->get('/user', function () {
        return response()->json(['user' => Auth::user()]);
    });
});

//middleWare access ( authenticated) 
Route::middleware(['auth:api'])->group(function () {

    Route::prefix('routes')->group(function () {
        Route::get('/', [RouteController::class, 'index']);
        Route::get('/{id}', [RouteController::class, 'show']);
    });

    Route::prefix('schedules')->group(function () {
        Route::get('/transport-schedules', [TransportScheduleController::class, 'index']);
    });

    // 🟡 Group untuk (Super Admin Only)
    Route::middleware(['role:Super Admin'])->group(function () {
        
        //users
        Route::prefix('users')->group(function () {
            Route::get('/', [UserController::class, 'getAllUser']);
            Route::get('/{id}', [UserController::class, 'getUserById']);
            Route::put('/{id}', [UserController::class, 'updateUser']);
            Route::delete('/{id}', [UserController::class, 'deleteUser']);
            Route::post('/create-staff', [UserController::class, 'createStaff']);
        });

        //get all levesRole
        Route::prefix('levels')->group(function () {
            Route::get('/', [LevelController::class, 'index']);
            Route::put('/{id}', [LevelController::class, 'updateById']);
        });
        
        Route::prefix('transports')->group(function () {
            Route::get('/', [TransportController::class, 'index']);
            Route::get('/{id}', [TransportController::class, 'getById']);
            Route::post('/', [TransportController::class, 'store']);
            Route::put('/{id}', [TransportController::class, 'update']);
            Route::delete('/{id}', [TransportController::class, 'destroy']);
        });

        Route::prefix('bookings')->group(function () {
            Route::get('/', [BookingController::class, 'index']);
        });

        Route::prefix('routes')->group(function () {
            Route::get('/', [RouteController::class, 'index']);
            Route::get('/{id}', [RouteController::class, 'show']);
            Route::post('/', [RouteController::class, 'store']);
            Route::put('/{id}', [RouteController::class, 'update']);
            Route::delete('/{id}', [RouteController::class, 'destroy']);
        });

        Route::prefix('bookings')->group(function () {
            Route::get('/', [BookingController::class, 'index']);
            Route::delete('/{id}', [BookingController::class, 'deleteBooking']);
        });

        Route::prefix('schedules')->group(function () {
            Route::post('/transport-schedules', [TransportScheduleController::class, 'store']);
        });

    });
    //

    // 🟠 Group untuk (Staff & Super Admin)
    Route::middleware(['role:Staff,Super Admin'])->group(function () {

        Route::prefix('transport-class')->group(function () {
            Route::get('/', [TransportClassController::class, 'index']);
        });

        Route::prefix('transport-type')->group(function () {
            Route::get('/', [TransportTypeController::class, 'index']);
            Route::get('/{id}', [TransportTypeController::class, 'show']);
        });

        Route::prefix('transports')->group(function () {
            Route::get('/', [TransportController::class, 'index']);
            Route::get('/{id}', [TransportController::class, 'getById']);
        });

    });
    //

    // 🔵 Passenger Only
    Route::middleware(['role:Passenger'])->group(function () {
        Route::prefix('bookings')->group(function () {
            Route::post('/', [BookingController::class, 'store']);
            Route::put('/{id}', [BookingController::class, 'CancelBooking']);
            Route::get('/my', [BookingController::class, 'getMyBookings']);
        });
    
    });
    //

});
