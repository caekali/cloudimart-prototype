<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;


class OrderController extends BaseController
{

     #[OA\Get(
            path: "/orders/{orderId}",
        summary: "Get single order",
        tags: ["Orders"],
        parameters: [
            new OA\Parameter(
                name: "orderId",
                description: "Order ID",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "string")),
        ],
        responses: [
            new OA\Response(response: 200, description: "Order retrieved.")
        ]
    )]
    public function show(Request $request,$orderId)
    {
        $order = Order::with(['items.product','delivery.location'])
            ->where('order_id', $orderId)
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Order not found.'
            ], 404);
        }

        return $this->successResponse([
            'order_id' => $order->order_id,
            'status' => $order->status,
            'payment_status' => $order->payment_status,
            'total_amount' => $order->total_amount,
            'delivery_location' => $order->delivery->location->name,
            'contact' => [
                "phone" => $order->user->phone,
                "email" => $order->user->email
            ],
            'items' => $order->items->map(function ($item) {
                return [
                    'product_name' => $item->product->name,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'subtotal' => $item->subtotal,
                ];
            }),
            'created_at' => $order->created_at,
        ]);
    }
}
