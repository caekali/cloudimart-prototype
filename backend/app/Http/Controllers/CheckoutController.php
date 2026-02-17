<?php
// app/Http/Controllers/CheckoutController.php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Delivery;
use App\Models\DeliveryLocation;
use App\Services\PayChanguService;
use App\Services\SmsService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\Response;

class CheckoutController extends BaseController
{

 #[OA\Post(
        path: "/checkout",
        summary: "Create order and initiate payment gateway",
        requestBody: new OA\RequestBody(required: true,
            content: new OA\MediaType(mediaType: "application/json",
                schema: new OA\Schema(required: ["location_id"],
                    properties: [
                        new OA\Property(property: 'location_id', description: "Delivery Location ID", type: "integer"),
                        ]
                ))),
        tags: ["Checkout"],
        responses: [
            new OA\Response(response: Response::HTTP_BAD_REQUEST, description: "Cart is empty"),
            new OA\Response(response: Response::HTTP_UNPROCESSABLE_ENTITY, description: "Unprocessable entity"),
            new OA\Response(response: Response::HTTP_INTERNAL_SERVER_ERROR, description: "Internal Server Error")
        ]
    )]
    public function checkout(CheckoutRequest $request,PayChanguService $payChangu)
    {
        $data = $request->validated();
        $user = $request->user();

        $location = DeliveryLocation::findOrFail($data["location_id"]);

        // Get user's cart
        $cart = Cart::with('items.product')->where('user_id', $user->id)->first();
        if (!$cart || $cart->items->isEmpty()) {
            return $this->errorResponse('Your cart is empty.', null, 400);
        }

            //   Check stock without deducting
        // foreach ($cart->items as $item) {
        //     if ($item->product->stock < $item->quantity) {
        //         return $this->errorResponse($item->product->name.' is out of stock', null, 400);
        //     }
        // }

        // Create pending order
        DB::beginTransaction();
        try {
            $order = Order::create([
                'order_id' => Order::generateOrderId($location),
                'user_id' => $user->id,
                'total_amount' => $cart->items->sum(fn($item) => $item->quantity * $item->price),
                'status' => 'pending',
            ]);

            foreach ($cart->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'subtotal' => $item->quantity * $item->price,
                ]);
            }

            // delivery record
            Delivery::create([
                'order_id' => $order->id,
                'status' => 'pending',
                'delivery_location_id' => $data["location_id"],
            ]);

            // clear cart
            $cart->delete();

            DB::commit();

           
           


            // payment initiate
            $response = $payChangu->initiatePayment(
            $order->order_id,
            $cart->items->sum(fn($i) => $i->quantity * $i->price),'MWK',$user);


            if (! $response->successful()) {
                return $this->errorResponse($data['message'] ?? 'Unknown error with payment gateway', null, 400);
            }


            $data = $response->json();

            $paymentLink = $data['data']['checkout_url'];

            

            return $this->successResponse([
                'order_id' => $order->id,
                'payment_link' => $paymentLink,
            ], 'Payment initiated', 201);



        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(), null, 500);
        }

    }
}
