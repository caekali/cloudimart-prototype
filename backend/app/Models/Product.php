<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Laravel\Scout\Searchable;

class Product extends Model
{

     use Searchable;

    protected $fillable = [
        'name',
        'description',
        'price',
        'image_url',
        'category_id',
    ];


    public function toSearchableArray()
    {
        return [
            'id' => $this->id,    
            'name' => $this->name,
            'description' => $this->description,
        ];
    }

    public function getImageUrlAttribute($value): ?string
    {
        return $value ? Storage::disk('public')->url($value) : null;
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
