<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
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
    $query = Product::query()->orderBy('id', 'desc');

    if ($request->filled('category')) {

        $category = Category::where('slug', $request->category)->first();

        if (! $category) {
            return $this->errorResponse(
                message: 'Category not found.',
                status_code: 404
            );
        }

        $query->where('category_id', $category->id);
    }

    $products = $query->cursorPaginate(15);

    $resource = ProductResource::collection($products);
    $response = $resource->response()->getData(true);

    return $this->successResponse(
        data: $response['data'],
        message: 'Products retrieved.',
        meta: $response['meta']
    );
}

    // #[OA\Get(
    //     path: "/categories/{categoryId}/products",
    //     summary: "Get products by category",
    //     tags: ["Products"],
    //     parameters: [
    //         new OA\Parameter(
    //             name: "categoryId",
    //             description: "Id of the category",
    //             in: "path",
    //             required: true,
    //             schema: new OA\Schema(type: "integer")),
    //     ],
    //     responses: [
    //         new OA\Response(response: 200, description: "Products retrieved.")
    //     ]
    // )]
    // public function getProductsByCategory(Request $request, $categoryId)
    // {
    //     if ($categoryId) {
    //         Category::findOrFail($categoryId);
    //     }

    //     $products = Product::where('category_id', $categoryId)->cursorPaginate(15);
    //     $resource = ProductResource::collection($products);
    //     $response = $resource->response()->getData(true);
    //     return $this->successResponse(data: $response['data'], message: 'Products retrieved.', meta: $response['meta']);
    // }


    public function search(Request $request)
    {
        $category = null;
         if ($request->filled('category')) {

        $category = Category::where('slug', $request->category)->first();

        if (! $category) {
            return $this->errorResponse(
                message: 'Category not found.',
                status_code: 404
            );
        }
        
        }
        $query = $request->validate([
                    'q' => 'required|string|min:1',
                ])['q'];

                $products = Product::search($query)
            ->query(function ($builder) use ($category) {
                if($category)
                $builder->where('category_id', $category->id);
            })
            ->paginate(15);

        return $this->successResponse(ProductResource::collection($products));
    }


    #[OA\Get(
        path: "/products/{productId}",
        summary: "Get products by productId",
        tags: ["Products"],
        parameters: [
            new OA\Parameter(
                name: "productId",
                description: "Id of the product",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")),
        ],
        responses: [
            new OA\Response(response: 200, description: "Products retrieved.")
        ]
    )]
     public function show($id)
    {
        $product = Product::findOrfail($id);

        return $this->successResponse(new ProductResource($product));
    }

     #[OA\Get(
        path: "/products/slug/{slug}",
        summary: "Get product by slug",
        tags: ["Products"],
        parameters: [
            new OA\Parameter(
                name: "slug",
                description: "slug of the product",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "string")),
        ],
        responses: [
            new OA\Response(response: 200, description: "Product retrieved.")
        ]
    )]
    public function showBySlug(string $slug)
{
    $product = Product::where('slug', $slug)->firstOrFail();

    return $this->successResponse(new ProductResource($product));
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
                        new OA\Property(property: 'stock_quantity', description: "Stock qauntity", type: "integer" ,minimum:1),
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

        // Generate unique slug from product name
        $data['slug'] = $this->generateUniqueSlug($data['name']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['image_url'] = $path;
        }

        $product = Product::create($data);

        return $this->successResponse(data:new ProductResource($product),message: 'Product added');
    }

    private function generateUniqueSlug(string $name): string
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $count = 1;

        while (Product::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }

        return $slug;
    }
}
