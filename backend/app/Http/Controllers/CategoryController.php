<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends BaseController
{

    #[OA\Get(
        path: "/categories",
        summary: "Get all categories",
        tags: ["Categories"],
        responses: [
            new OA\Response(response: 200, description: "Success")
        ]
    )]
    public function index()
    {
        $categories = Category::all();
        return $this->successResponse(CategoryResource::collection($categories));
    }


    #[OA\Post(
        path: "/categories",
        summary: "Add a Category",
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\MediaType(
                mediaType: "application/json",
                schema: new OA\Schema(
                    required: ["name", "description"],
                    properties: [
                        new OA\Property(property: "name", type: "string", example: "Electronics"),
                        new OA\Property(property: "description", type: "string", example: "Electronic devices")
                    ]
                )
            )
        ),
        tags: ["Categories"],
        responses: [
            new OA\Response(response: Response::HTTP_CREATED, description: "Category created"),
            new OA\Response(response: Response::HTTP_UNPROCESSABLE_ENTITY, description: "Validation failed"),
            new OA\Response(response: Response::HTTP_INTERNAL_SERVER_ERROR, description: "Server error")
        ]
    )]
    public function store(StoreCategoryRequest $request)
    {
        $data = $request->validated();

        $category = Category::create([
            'name' => $data['name'],
            'description' => $data['description'],
        ]);

        return $this->successResponse(new CategoryResource($category), Response::HTTP_CREATED);
    }


    #[OA\Get(
        path: "/categories/{id}",
        summary: "Get single category",
        tags: ["Categories"],
        parameters: [
            new OA\Parameter(
                name: "id",
                description: "Category ID",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(response: Response::HTTP_OK, description: "Success"),
            new OA\Response(response: Response::HTTP_NOT_FOUND, description: "Category not found")
        ]
    )]
    public function show(Category $category)
    {
        return $this->successResponse(new CategoryResource($category));
    }


    #[OA\Patch(
        path: "/categories/{id}",
        summary: "Update a category",
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\MediaType(
                mediaType: "application/json",
                schema: new OA\Schema(
                    properties: [
                        new OA\Property(property: "name", type: "string", example: "Updated Name"),
                        new OA\Property(property: "description", type: "string", example: "Updated description")
                    ]
                )
            )
        ),
        tags: ["Categories"],
        parameters: [
            new OA\Parameter(
                name: "id",
                description: "Category ID",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(response: Response::HTTP_OK, description: "Category updated"),
            new OA\Response(response: Response::HTTP_NOT_FOUND, description: "Category not found"),
            new OA\Response(response: Response::HTTP_UNPROCESSABLE_ENTITY, description: "Validation failed")
        ]
    )]
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $data = $request->validated();

        $category->update($data);

        return $this->successResponse(new CategoryResource($category));
    }


    #[OA\Delete(
        path: "/categories/{id}",
        summary: "Delete a category",
        tags: ["Categories"],
        parameters: [
            new OA\Parameter(
                name: "id",
                description: "Category ID",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(response: Response::HTTP_NO_CONTENT, description: "Category deleted"),
            new OA\Response(response: Response::HTTP_NOT_FOUND, description: "Category not found")
        ]
    )]
    public function destroy(Category $category)
    {
        $category->delete();

        return $this->successResponse(null,status_code:Response::HTTP_NO_CONTENT);
    }
}
