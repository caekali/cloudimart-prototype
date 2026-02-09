<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|unique:products,name',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0|between:0,999999.99',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg',
            'category_id' => 'required|integer|exists:categories,id',
        ];
    }
}
