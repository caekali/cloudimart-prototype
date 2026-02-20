<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\DeliveryLocationController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;


/*
public routes
*/

Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/delivery-locations', [DeliveryLocationController::class, 'index']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/search', [ProductController::class, 'search']);

Route::get('/products/{productId}', [ProductController::class, 'show']);
Route::get('/products/slug/{slug}', [ProductController::class, 'showBySlug']);

// Payment Webhook
Route::post('/paychangu/webhook', [PaymentController::class, 'handleWebhook']);


Route::prefix('auth')->group(function () {
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/verify-email', [AuthController::class, 'verifyEmail']);
    Route::post('/signin', [AuthController::class, 'signin']);
    Route::post('/logout', [AuthController::class, 'logout'])
        ->middleware('auth:sanctum');
});


 Route::middleware([])
        ->prefix('admin')
        ->group(function () {

            Route::post('/categories', [\App\Http\Controllers\CategoryController::class, 'store']);
            Route::patch('/categories/{id}', [\App\Http\Controllers\CategoryController::class, 'update']);
            Route::delete('/categories/{id}', [\App\Http\Controllers\CategoryController::class, 'destroy']);
        Route::get('/{id}', [CategoryController::class, 'show']);

            Route::post('/products', [\App\Http\Controllers\ProductController::class, 'store']);
            Route::patch('/products/{id}', [\App\Http\Controllers\ProductController::class, 'update']);
            Route::delete('/products/{id}', [\App\Http\Controllers\ProductController::class, 'destroy']);

            // Route::get('/orders/{orderId}', [\App\Http\Controllers\OrderController::class, 'show']);
        });



Route::middleware('auth:sanctum')
        ->prefix('me')
        ->group(function () {

            Route::get('/profile', [\App\Http\Controllers\UserController::class, 'getProfile']);
            Route::prefix('cart')->group(function () {
                Route::get('/', [\App\Http\Controllers\CartController::class, 'index']);
                Route::post('/items', [\App\Http\Controllers\CartController::class, 'store']);
                Route::patch('/items/{itemId}', [\App\Http\Controllers\CartController::class, 'updateQuantity']);
                Route::delete('/items/{itemId}', [\App\Http\Controllers\CartController::class, 'destroy']);
                Route::delete('/items', [\App\Http\Controllers\CartController::class, 'clear']);
            });

            Route::get('/orders', [\App\Http\Controllers\Customer\OrderController::class, 'index']);
            Route::get('/orders/{id}', [\App\Http\Controllers\Customer\OrderController::class, 'show']);

            Route::post('/checkout', [\App\Http\Controllers\CheckoutController::class, 'checkout']);
        });


// Delivery
Route::middleware(['auth:sanctum','delivery'])->group(function () {
    Route::get('/deliveries', [DeliveryController::class, 'index']);
    Route::post('/deliveries/confirm', [DeliveryController::class, 'confirmDelivery']);
    Route::get('/deliveries/{id}', [DeliveryController::class, 'show']);
});
