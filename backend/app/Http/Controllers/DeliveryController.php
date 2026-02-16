<?php 

namespace App\Http\Controllers;

use App\Http\Requests\ConfirmDeliveryRequest;
use App\Models\Delivery;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\Response;

class DeliveryController extends BaseController
{
     #[OA\Post(
        path: "/confirm-delivery",
        summary: "Confirm Delivery",
        requestBody: new OA\RequestBody(required: true,
            content: new OA\MediaType(mediaType: "application/json",
                schema: new OA\Schema(required: ["location_id"],
                    properties: [
                        new OA\Property(property: 'order_id', description: "Order ID", type: "string"),
                        new OA\Property(property: 'customer_phone', description: "Collector Phone Number", type: "string"),

                        ]
                ))),
        tags: ["Deliveries"],
        responses: [
            new OA\Response(response: Response::HTTP_NOT_FOUND, description: "Order Not Found"),
            new OA\Response(response: Response::HTTP_BAD_REQUEST, description: "Cart is empty"),
            new OA\Response(response: Response::HTTP_UNPROCESSABLE_ENTITY, description: "Unprocessable entity"),
            new OA\Response(response: Response::HTTP_INTERNAL_SERVER_ERROR, description: "Internal Server Error")
        ]
    )]
    public function confirmDelivery(ConfirmDeliveryRequest $request)
    {
        $data = $request->validate();

        // Find the order
        $order = Order::where('order_id', $request->order_id)->first();
        if (!$order) {
            return $this->errorResponse('Order not found.',null, 404);
        }

        // Find the delivery record for this order and phone
        $delivery = Delivery::where('order_id', $order->id)
            ->where('customer_phone', $request->customer_phone)
            ->first();

        if (!$delivery) {
            return $this->errorResponse('Delivery record not found.',null, 404);
        }

        if ($delivery->status === 'delivered') {
            return $this->errorResponse('Order already marked as delivered.',null, 400);
        }

        $delivery->update([
            'status' => 'delivered',
            'delivered_at' => now(),
        ]);

        $order->update(['status' => 'delivered']);

        // notify user
        Mail::raw(
            "Hello {$order->user->name}, your order {$order->order_id} has been successfully delivered. Thank you for shopping with Cloudimart!",
            function ($message) use ($order) {
                $message->to($order->user->email)
                        ->subject('Cloudimart Order Delivered');
            }
        );

      return $this->successResponse(message:'Delivery confirmed');
    }
}
