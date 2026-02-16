<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\BaseController;
use App\Http\Resources\OrderResource;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\Response;

class OrderController extends BaseController
{
    #[OA\Get(
        path: "/me/orders",
        summary: "Get authenticated user's orders",
        security: [["bearerAuth" => []]],
        tags: ["Customer Orders"],
        responses: [
            new OA\Response(response: Response::HTTP_OK, description: "Success"),
            new OA\Response(response: Response::HTTP_UNAUTHORIZED, description: "Unauthenticated")
        ]
    )]
    public function index(Request $request)
    {
        $orders = $request->user()
            ->orders()
            ->with(['items.product']) 
            ->latest()
            ->paginate(10);

        return $this->successResponse(
            OrderResource::collection($orders)
        );
    }

    #[OA\Get(
        path: "/me/orders/{id}",
        summary: "Get a single order belonging to customer",
        security: [["bearerAuth" => []]],
        tags: ["Customer Orders"],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(response: Response::HTTP_OK, description: "Success"),
            new OA\Response(response: Response::HTTP_NOT_FOUND, description: "Order not found"),
            new OA\Response(response: Response::HTTP_UNAUTHORIZED, description: "Unauthenticated")
        ]
    )]
    public function show(Request $request, $id)
    {
        $order = $request->user()
            ->orders()
            ->with(['items.product'])
            ->where('id', $id)
            ->firstOrFail();

        return $this->successResponse(
            new OrderResource($order)
        );
    }
}
