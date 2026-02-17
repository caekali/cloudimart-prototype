<?php 

namespace App\Http\Controllers;

use App\Http\Requests\ConfirmDeliveryRequest;
use App\Http\Resources\DeliveryDetailResource;
use App\Http\Resources\DeliveryResource;
use App\Models\Delivery;
use App\Models\Order;
use App\Services\SmsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\Response;

class DeliveryController extends BaseController
{

    public function index()
    {
        $user = Auth::user();
         $deliveries = Delivery::with('order.user')->where("delivery_person_id",$user->id)->orderBy('status')
            ->orderBy('created_at', 'desc')
            ->get();
        return $this->successResponse(DeliveryResource::collection($deliveries));
    
    }

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

    public function show($id)
    {
        $user = Auth::user();

        $delivery = Delivery::with(['order', 'order.user', 'location'])->findOrFail($id);
        
        // if($delivery->delivery_person_id != $user->id){
        //     return $this->errorResponse(message:"Not Authorized to handle this delivery",status_code:403);
        // }

        return $this->successResponse(new DeliveryDetailResource($delivery));
    }
    public function confirmDelivery(ConfirmDeliveryRequest $request,SmsService $smsService)
    {
        $data = $request->validated();

        // Find the order
        $order = Order::where('order_id', $request->order_id)->first();
        if (!$order) {
            return $this->errorResponse('Order not found.',null, 404);
        }

        if($order->payment_status != "paid"){
            return $this->errorResponse('Payment not complete for this order.',null, 400);

        }

        $delivery = Delivery::where('order_id', $order->id)->first();

        if (!$delivery) {
            return $this->errorResponse('Delivery record not found.',null, 404);
        }

        if ($delivery->status === 'delivered') {
            return $this->errorResponse('Order already marked as delivered.',null, 400);
        }

        $delivery->update([
            'status' => 'delivered',
            'delivered_at' => now(),
            'collector_phone' => $data['collector_phone']
        ]);

        $order->update(['status' => 'delivered']);


        $smsService->sendSMS($order->user->phone,"Cloudimart: Order {$order->order_id} delivered successfully. Thank you for shopping with us."
                );

      return $this->successResponse(message:'Delivery confirmed');
    }
}
