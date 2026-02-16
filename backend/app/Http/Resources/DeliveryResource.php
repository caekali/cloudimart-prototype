<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DeliveryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
     public function toArray($request)
    {
        return [
            'delivery_id' => $this->id,
            'order_id' => $this->order->order_id,
            'status' => $this->status,
            'delivered_at' => $this->delivered_at,
            'customer_name' => $this->order->user->name,
            'total_amount' => $this->order->total_amount,
            'items_count' => $this->order->items->count(),
        ];
    }
}

