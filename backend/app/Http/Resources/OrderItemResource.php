<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,

            'name' => $this->product?->name,
                'slug' => $this->product?->slug,
                'image' => $this->product?->image_url,

            'quantity' => $this->quantity,
            'price' => $this->price,
            'total_price' => $this->quantity * $this->price,
        ];
    }
}


