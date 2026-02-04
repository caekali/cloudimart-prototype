<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;

class ApiResponse
{
    public static function make(
        bool $success,
        string $message,
        int $status_code,
        mixed $data = null,
        mixed $errors = null
    ): JsonResponse {
        return response()->json([
            'success' => $success,
            'message' => $message,
            'data'    => $data,
            'errors'  => $errors,
        ], $status_code);
    }

    public static function success(mixed $data = null, string $message = 'Success', int $status_code = 200): JsonResponse
    {
        return self::make(true, $message, $status_code, $data);
    }

    public static function error(string $message = 'Error', int $status_code = 400, mixed $errors = null): JsonResponse
    {
        return self::make(false, $message, $status_code, null, $errors);
    }
}
