<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\DeliveryLocationController;
use App\Http\Controllers\Customer\OrderController as CustomerOrderController;

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::get('/categories', [CategoryController::class,'index']);
Route::get('/delivery-locations', [DeliveryLocationController::class,'index']);

Route::prefix('categories')->group(function () {
    Route::post('/', [CategoryController::class, 'store']);
    Route::get('/{id}', [CategoryController::class, 'show']);
    Route::patch('/{id}', [CategoryController::class, 'update']);
    Route::delete('/{id}', [CategoryController::class, 'destroy']);
})->middleware('auth:sanctum');


Route::get('/categories/{categoryId}/products', [ProductController::class, 'getProductsByCategory']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{productId}', [ProductController::class, 'show']);
Route::get('/products/slug/{slug}', [ProductController::class, 'showBySlug']);
Route::post('/products', [ProductController::class, 'store']);
Route::post('/products/search', [ProductController::class, 'search']);

Route::get('/profile', [UserController::class, 'getProfile'])->middleware('auth:sanctum');

Route::prefix('/auth')->group(function () {
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/verify-email', [AuthController::class, 'verifyEmail']);
    Route::post('/signin', [AuthController::class, 'signin']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});


Route::middleware('auth:sanctum')->prefix('cart')->group(function () {
    Route::get('', [CartController::class, 'index']);
    Route::post('/items', [CartController::class, 'store']);
    Route::patch('/items/{itemId}', [CartController::class, 'updateQuantity']);
    Route::delete('/items/{itemId}', [CartController::class, 'destroy']);
    Route::delete('/items/clear', [CartController::class, 'clear']);
});

Route::post('/checkout', [CheckoutController::class, 'checkout'])->middleware('auth:sanctum');
Route::middleware(['auth:sanctum','delivery'])->post('/delivery/confirm', [DeliveryController::class, 'confirmDelivery']);

Route::middleware('auth:sanctum')
    ->prefix('me')
    ->group(function () {
        Route::get('/orders', [CustomerOrderController::class, 'index']);
        Route::get('/orders/{id}', [CustomerOrderController::class, 'show']);
    });

Route::post('/paychangu/webhook', [PaymentController::class, 'handleWebhook']);
