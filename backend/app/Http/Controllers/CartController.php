<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartResource;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\Response;

class CartController extends BaseController
{
    #[OA\Get(
        path: "/cart",
        summary: "Get user cart",
        tags: ["Cart"],
        responses: [
            new OA\Response(response: 200, description: "Cart retrieved successfully.")
        ]
    )]
    public function index(Request $request)
    {

        $user = Auth::user();

        $cart = $user->cart()->first();
        if (! $cart) {
                    return $this->successResponse([
                        "items" => []
                    ]);
        }

        $cart = $cart->load('items.product');

        return $this->successResponse(new CartResource($cart));
    }


    
    #[OA\Post(
        path: "/cart/items",
        summary: "Add item to cart",
        requestBody: new OA\RequestBody(required: true,
            content: new OA\MediaType( mediaType:"application/json",
                schema: new OA\Schema(required: ["product_id", "quantity"],
                    properties: [
                        new OA\Property(property: 'product_id', description: "Product Id", type: "integer"),
                        new OA\Property(property: 'quantity', description: "Quantity", type: "integer" ,minimum:1),
                        ]
                ))),
        tags: ["Cart"],
        responses: [
            new OA\Response(response: Response::HTTP_CREATED, description: "Product added to cart"),
            new OA\Response(response: Response::HTTP_UNPROCESSABLE_ENTITY, description: "Unprocessable entity"),
            new OA\Response(response: Response::HTTP_BAD_REQUEST, description: "Bad Request"),
            new OA\Response(response: Response::HTTP_INTERNAL_SERVER_ERROR, description: "Internal Server Error")
        ]
    )]
    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();

        $cart = $user->cart()->first();
        if (! $cart) {
            $cart = $user->cart()->create();
        }

        $product = Product::findOrFail($data['product_id']);
        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if ($cartItem) {
            $cartItem->quantity += $data['quantity'];
            $cartItem->subtotal = $cartItem->quantity * $product->price;
            $cartItem->save();
        } else {
            $cartItem = $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $data['quantity'],
                'price' => $product->price,
                'subtotal' => $product->price * $data['quantity'],
            ]);
        }

        $cart->save();

        return $this->successResponse(data:new CartResource($cart),message:'Product added to cart successfully',status_code: 201);
    }


     #[OA\Patch(
        path: "/cart/items/{itemId}",
        summary: "Update cart item quantity",
        requestBody: new OA\RequestBody(required: true,
            content: new OA\MediaType(
                mediaType:"application/json",
                schema: new OA\Schema(required: [ "quantity"],
                    properties: [
                        new OA\Property(property: 'quantity', description: "Quantity", type: "integer" ,minimum:1),
                        ]
                ))),
        tags: ["Cart"],
        parameters: [
            new OA\Parameter(
                name: "itemId",
                description: "Cart item id",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "string")),
        ],
        responses: [
            new OA\Response(response: 200, description: "Cart item updated."),
                        new OA\Response(response: 404, description: "Cart Not Found.")

        ]
    )]
    public function updateQuantity(Request $request, $itemId)
    {
        $data = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();

        $cart = $user->cart()->first();
        if (! $cart) {
            return $this->errorResponse('Cart Not Found', 404);
        }

        $cartItem = $cart->items()->where('id', $itemId)->first();
        if (! $cartItem) {
            return $this->errorResponse('Item Not Found', 404);
        }

        $cartItem->update([
            'quantity' => $data['quantity'],
        ]);

        $cart->load('items.product');

        return $this->successResponse(
            data: new CartResource($cart),
            message: 'Cart item updated',
            status_code: 200
        );
    }


     #[OA\Delete(
        path: "/cart/items/{itemId}",
        summary: "Remove item from cart",
        tags: ["Cart"],
        parameters: [
            new OA\Parameter(
                name: "itemId",
                description: "Cart item id",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "string")),
        ],
        responses: [
            new OA\Response(response: 200, description: "Cart item removed."),
                        new OA\Response(response: 404, description: "Cart Not Found.")

        ]
    )]
    public function destroy(Request $request, $itemId)
    {
        $user = Auth::user();

        $cart = $user->cart()->first();

        if (! $cart) {
            return $this->errorResponse('Cart Not Found',status_code: 404);
        }

        $cartItem = $cart->items()->where('id', $itemId)->first();

        if (! $cartItem) {
            return $this->errorResponse('Item Not Found',status_code:  404);
        }

        $cartItem->delete();

        $cart->load('items');

        return $this->successResponse(
            data: new CartResource($cart),
            message: 'Cart item removed'
        );
    }



 #[OA\Delete(
        path: "/cart/clear",
        summary: "Remove all items from cart",
        tags: ["Cart"],
        responses: [
            new OA\Response(response: 200, description: "Cart cleared."),

        ]
    )]
    public function clear(Request $request)
    {
        $user = Auth::user();

        $cart = $user->cart()->first();

        if ($cart) {
            $cart->delete();

            return $this->successResponse(message: 'Cart cleared');
        }

        return $this->errorResponse(message: 'Cart Not Found', status_code: 404);
    }
}
