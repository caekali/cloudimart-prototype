<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use OpenApi\Attributes as OA;


#[
    OA\Info(version: "1.0.0", description: "Cloudimart api", title: "Cloudimart api Documentation"),
    OA\Server(url: 'http://localhost:8000/api', description: "local server"),
    OA\SecurityScheme( securityScheme: 'bearerAuth', type: "http", name: "Authorization", in: "header", scheme: "bearer"),
]
class BaseController extends Controller
{
    protected function successResponse($data = null, $message = 'Success', $status_code = 200, $meta = null): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'errors' => null,
            'meta' => $meta,
        ], $status_code);
    }

    protected function errorResponse($message = 'Error', $errors = null, $status_code = 400): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'data' => null,
            'errors' => $errors,
            'meta' => null,
        ], $status_code);
    }
}
