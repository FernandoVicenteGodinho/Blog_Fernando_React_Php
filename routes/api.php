<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\PostController;
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
Route::post('/logout', [AuthenticationController::class, 'Logout']);
Route::get('/posts', [PostController::class, 'GetPosts'])->middleware(['optional.auth']);
// Route::get('/posts', [PostController::class, 'GetPosts']);

Route::middleware(['auth:sanctum', 'access.web'])->group(function () {
    // Route::get('/posts', [PostController::class, 'GetPosts']);
    Route::get('/teste', [UserController::class, 'teste']);
    Route::get('/validator', [AuthenticationController::class, 'ValidatorToken']);
    Route::get('/user', [UserController::class, 'GetUser']);
    Route::post('/user', [UserController::class, 'UpdateUser']);
    Route::post('/posts', [PostController::class, 'CreatePost']);
});

