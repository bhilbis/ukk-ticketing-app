<?php

use App\Http\Controllers\{
    AuthController,
    BookingController,
    LevelController,
    PasswordResetController,
    RouteController,
    transport\TransportClassController,
    transport\TransportController,
    transport\TransportScheduleController,
    transport\TransportTypeController,
    payments\PaymentController,
    payments\PaymentMethodController,
    UserController
};
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

    Route::post('refresh', [AuthController::class, 'refresh'])->middleware('jwt.refresh');
    // 🔒 Hanya bisa diakses jika sudah login
    Route::middleware(['auth:api'])->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
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
            Route::post('/', [TransportController::class, 'store']);
            Route::put('/{id}', [TransportController::class, 'update']);
            Route::delete('/{id}', [TransportController::class, 'destroy']);
        });

        Route::prefix('routes')->group(function () {
            Route::post('/', [RouteController::class, 'store']);
            Route::put('/{id}', [RouteController::class, 'update']);
            Route::delete('/{id}', [RouteController::class, 'destroy']);
        });

        Route::prefix('bookings')->group(function () {
            Route::delete('/{id}', [BookingController::class, 'deleteBooking']);
        });

        Route::prefix('schedules')->group(function () {
            Route::post('/', [TransportScheduleController::class, 'store']);
            Route::put('/{id}', [TransportScheduleController::class, 'update']);
            Route::delete('/{id}', [TransportScheduleController::class, 'destroy']);
        });
    });
    //

    // 🟠 Group untuk (Staff & Super Admin)
    Route::middleware(['role:Staff,Super Admin'])->group(function () {

        Route::prefix('transports')->group(function () {
            Route::get('/', [TransportController::class, 'index']);
            Route::get('/{id}', [TransportController::class, 'getById']);
        });

        Route::prefix('schedules')->group(function () {
            Route::get('/', [TransportScheduleController::class, 'index']);
            Route::get('/{id}', [TransportScheduleController::class, 'show']);
        });

        Route::prefix('bookings')->group(function () {
            Route::get('/', [BookingController::class, 'index']);
            Route::put('/validate/{id}', [BookingController::class, 'validatePayment']);
        });

    });
    //

    // 🔵 Passenger Only
    Route::middleware(['role:Passenger'])->group(function () {
        Route::prefix('bookings')->group(function () {
            Route::post('/', [BookingController::class, 'store']);
            Route::get('/unpaid', [BookingController::class, 'getUnpaidBookings']);
            Route::get('/paid', [BookingController::class, 'getPaidBookings']);
            Route::put('/{id}', [BookingController::class, 'CancelBooking']);
            Route::get('/my', [BookingController::class, 'getMyBookings']);
        });

        Route::prefix('payments')->group(function () {
            Route::get('/', [PaymentController::class, 'index']);
            Route::get('/{id}', [PaymentController::class, 'show']);
            Route::post('/', [PaymentController::class, 'store']);
        });

        Route::prefix('payment-methods')->group(function () {
            Route::get('/', [PaymentMethodController::class, 'index']);
            Route::post('/', [PaymentMethodController::class, 'store']);
            Route::put('/{id}', [PaymentMethodController::class, 'update']);
            Route::delete('/{id}', [PaymentMethodController::class, 'destroy']);
        });
    });
    //

});
