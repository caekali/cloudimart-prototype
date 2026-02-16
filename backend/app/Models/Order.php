<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    
    protected $fillable = ['order_id', 'user_id', 'total_amount', 'status', 'delivery_location_id', 'payment_status'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function items() {
        return $this->hasMany(OrderItem::class);
    }

    public function delivery() {
        return $this->hasOne(Delivery::class);
    }

    public function delivery_location(){
        return $this->hasOne(DeliveryLocation::class);
    }
}
