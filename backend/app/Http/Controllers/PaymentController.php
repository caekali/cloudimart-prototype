<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\PayChanguService;
use App\Services\SmsService;
use Symfony\Component\HttpFoundation\Request;

use OpenApi\Attributes as OA;


class PaymentController{

 #[OA\Get(
        path: "/paychangu/webhook",
        summary: "Webhook for paychangu payment gatway for get payment notificaations",
        tags: ["Payments"],
        responses: [
            new OA\Response(response: 200, description: "OK.")
        ]
    )]
    public function handleWebhook(Request $request, PayChanguService $payChangu,SmsService $smsService)
    { 
        $data = $request->all();
        $verification = $payChangu->verifyPayment($data['tx_ref']);

        if ($verification['status'] === 'success' && $verification['data']['status'] === 'success') {
            $order = Order::where('order_id', $data['tx_ref'])->first();

            if ($order) {
                  // Deduct stock
                foreach ($order->items as $item) {
                $item->product->decrement('stock_quantity', $item->quantity);
            }
                $order->update(['payment_status' => 'paid']);

                $smsService->sendSMS($order->user->phone,"Cloudimart: Order Confirmed.
                    Order ID: {$order->order_id}
                    Amount: {$order->total_amount}
                    Delivery: {$order->delivery->location->name}

                    Keep this ID for delivery verification.
                    ");

                $order->user->cart->items()->delete();
            }
        }

        return response()->json(['status' => 'ok']);
    }

}