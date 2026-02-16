<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    
    protected $fillable = ['order_id', 'user_id', 'total_amount', 'status', 'payment_status'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function items() {
        return $this->hasMany(OrderItem::class);
    }

    public function delivery() {
        return $this->hasOne(Delivery::class);
    }


 public static function generateOrderId($location) {
    $prefix = 'CM';
    $datePart = date('Ymd'); // YYYYMMDD

    // Count orders for this location today
   $dailyCount = Delivery::where('delivery_location_id', $location->id)
                          ->whereDate('created_at', today())
                          ->count();

    // Next sequential number for today
    $seqNumber = str_pad($dailyCount + 1, 3, '0', STR_PAD_LEFT);

    // Random 2-character alphanumeric suffix (0-9, A-Z)
    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomSuffix = '';
    for ($i = 0; $i < 2; $i++) {
        $randomSuffix .= $characters[rand(0, strlen($characters) - 1)];
    }

    // Order ID
    $orderId = "{$prefix}-{$location->code}-{$datePart}-{$seqNumber}{$randomSuffix}";

    return $orderId;
}
}
