<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/categories', [CategoryController::class,'index']);
Route::get('/categories/{categoryId}/products', [ProductController::class, 'getProductsByCategory']);
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::post('/products/search', [ProductController::class, 'search']);

// Route::get('/profile', [UserController::class, 'getUser'])->middleware('auth:sanctum');

Route::prefix('/auth')->group(function () {
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/verify-email', [AuthController::class, 'verifyEmail']);
    Route::post('/signin', [AuthController::class, 'signin']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});
