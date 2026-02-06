<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\Response;

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
        $products = Product::orderBy('id', 'desc')->cursorPaginate(15);
        $resource = ProductResource::collection($products);
        $response = $resource->response()->getData(true);
        return $this->successResponse(data: $response['data'], message: 'Products retrieved.', meta: $response['meta']);
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
            new OA\Response(response: 200, description: "Products retrieved.")
        ]
    )]
    public function getProductsByCategory(Request $request, $categoryId)
    {
        if ($categoryId) {
            Category::findOrFail($categoryId);
        }

        $products = Product::where('category_id', $categoryId)->cursorPaginate(15);
        $resource = ProductResource::collection($products);
        $response = $resource->response()->getData(true);
        return $this->successResponse(data: $response['data'], message: 'Products retrieved.', meta: $response['meta']);
    }


    public function search(Request $request)
    {
        $query = $request->query('q');
// $products = Product::search($query)
//     ->query(function ($builder) use ($request) {
//         $builder->where('category_id', $request->category_id ?? 0);
//     })
//     ->paginate(20);
        // Simple search
        $products = Product::search($query)->get();

        return response()->json($products);
    }

    #[OA\Post(
        path: "/products",
        summary: "Add a product",
        requestBody: new OA\RequestBody(required: true,
            content: new OA\MediaType(mediaType: "multipart/form-data",
                schema: new OA\Schema(required: ["name", "description", "price", "category_id"],
                    properties: [
                        new OA\Property(property: 'name', description: "Product name", type: "string"),
                        new OA\Property(property: 'description', description: "Product description", type: "string"),
                        new OA\Property(property: 'price', description: "Product price", type: "float"),
                        new OA\Property(property: 'image', description: "Product image",type: "string",format: "binary"),
                        new OA\Property(property: 'category_id', description: "Product category", type: "integer")
                        ]
                ))),
        tags: ["Products"],
        responses: [
            new OA\Response(response: Response::HTTP_CREATED, description: "Product Added"),
            new OA\Response(response: Response::HTTP_UNPROCESSABLE_ENTITY, description: "Unprocessable entity"),
            new OA\Response(response: Response::HTTP_BAD_REQUEST, description: "Bad Request"),
            new OA\Response(response: Response::HTTP_INTERNAL_SERVER_ERROR, description: "Internal Server Error")
        ]
    )]
    public function store(StoreProductRequest $request)
    {
       $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['image_url'] = $path;
        }

        Product::create($data);

        return $this->successResponse(message: 'Product added');
    }
}
