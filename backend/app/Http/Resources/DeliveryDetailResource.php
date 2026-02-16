<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DeliveryDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        return [
            'delivery_id' => $this->id,
            'order_id' => $this->order->id,
            'status' => $this->status,
            'delivered_at' => $this->delivered_at,
            'collector_phone' => $this->collector_phone,
            'customer' => [
                'id' => $this->order->user->id,
                'name' => $this->order->user->name,
                'email' => $this->order->user->email,
            ],
            'total_amount' => $this->order->total_amount,
            'payment_status' => $this->order->payment_status,
            'order_status' => $this->order->status,
            'placed_at' => $this->order->placed_at,
            'items' => $this->order->items->map(function($item) {
                return [
                    'id' => $item->id,
                    'product_id' => $item->product_id,
                    'name' => $item->product->name,
                    'slug' => $item->product->slug,
                    'image' => $item->product->image_url,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'total_price' => $item->quantity * $item->price , 
                ];
            }),
        ];
    }
}
