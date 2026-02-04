<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class ProductController extends BaseController
{
    #[OA\Get(
        path: "/products",
        summary: "Get products",
        tags: ["Products"],
        responses: [
            new OA\Response(response: 200, description: "Products retrieved successfully.")
        ]
    )]
    public function index(Request $request)
    {
        $products = Product::all();
        return $this->successResponse(ProductResource::collection($products), 'Products retrieved successfully.');
    }

    #[OA\Get(
        path: "/categories/{categoryId}/products",
        summary: "Get products by category",
        tags: ["Products"],
        parameters: [
            new OA\Parameter(
                name: "categoryId",
                description: "Id of the category",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")),
        ],
        responses: [
            new OA\Response(response: 200, description: "Products retrieved successfully.")
        ]
    )]
    public function getProductsByCategory(Request $request, $categoryId)
    {
        if ($categoryId) {
            Category::findOrFail($categoryId);
        }

        $products = Product::where('category_id', $categoryId)->get();
        return $this->successResponse(ProductResource::collection($products), 'Products retrieved successfully.');
    }
}
