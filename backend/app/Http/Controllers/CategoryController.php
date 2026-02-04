<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

use OpenApi\Attributes as OA;


class CategoryController extends BaseController
{

#[OA\Get(
    path:"/categories",
    summary: "Get categories",
    tags:["Categories"],
    responses: [
        new OA\Response(response: 200, description: "Success")
    ]
)]
    public function index()
    {
        $categories = Category::all();
        return $this->successResponse(CategoryResource::collection($categories));
    }
}
