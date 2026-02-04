<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'image_url',
        'category_id',
    ];

    public function getImageUrlAttribute($value): ?string
    {
        return $value ? Storage::disk('public')->url($value) : null;
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
