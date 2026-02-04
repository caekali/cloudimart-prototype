<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Faker\Provider\Base;
use Illuminate\Http\Request;

use OpenApi\Attributes as OA;

class ProductController extends BaseController
{
    #[OA\Get(
        path:"/products",
        summary: "Get products",
        tags:["Products"],
        responses: [
            new OA\Response(response: 200, description: "Products retrieved successfully.")
        ]
    )]
    public function index(Request $request){
        $products = Product::all();
        return $this->successResponse(ProductResource::collection($products), 'Products retrieved successfully.');
    }
}
