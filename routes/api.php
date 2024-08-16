<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/register', [UserController::class, 'CreateUser']);
Route::post('/login', [UserController::class, 'Login']);

Route::middleware(['auth:sanctum', 'access.web'])->group(function () {
    Route::get('/teste', [UserController::class, 'teste']);
    Route::get('/validator', [AuthenticationController::class, 'ValidatorToken']);
});

