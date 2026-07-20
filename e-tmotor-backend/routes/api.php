<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MotorController;
use App\Http\Controllers\Api\LayananController;
use App\Http\Controllers\Api\PelangganController;
use App\Http\Controllers\Api\ReservasiController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/layanan', [LayananController::class, 'index']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::put('/change-password', [AuthController::class, 'changePassword']);

    // Motor
    Route::apiResource('motor', MotorController::class);

    // Pelanggan
    Route::apiResource('pelanggan', PelangganController::class);

    // Reservasi
    Route::apiResource('reservasi', ReservasiController::class);
});