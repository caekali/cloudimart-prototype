<?php

namespace App\Http\Controllers;

use App\Models\DeliveryLocation;
use Illuminate\Http\Request;
use App\Http\Resources\DeliveryLocationResource;
use OpenApi\Attributes as OA;


class DeliveryLocationController extends BaseController
{

 #[OA\Get(
        path: "/delivery-locations",
        summary: "Get delivery locations",
        tags: ["Delivery Locations"],
        responses: [
            new OA\Response(response: 200, description: "Delivery locations retrieved successfully.")
        ]
    )]
    public function index(){
        $locations = DeliveryLocation::all();
        return $this->successResponse(DeliveryLocationResource::collection($locations));
    }
}
