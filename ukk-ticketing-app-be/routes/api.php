<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordResetController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group([
    // 'middleware' => 'auth:api',
    // 'except' => ['login', 'register'],
    'prefix' => 'auth',
], function ($router) {

    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout',[AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
});

Route::post('forgot-password', [PasswordResetController::class, 'validationForgotPassword']);
Route::post('resend-code', [PasswordResetController::class, 'resendValidationForgotPassword']);
Route::post('validate-code', [PasswordResetController::class, 'codeValidationForgotPassword']);
Route::post('reset-password', [PasswordResetController::class, 'resetPasswordForgotPassword']);

