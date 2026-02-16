<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use OpenApi\Attributes as OA;


class UserController extends BaseController
{

 #[OA\Get(
        path: "/profile",
        summary: "Get user profile",
        tags: ["Accounts"],
        responses: [
            new OA\Response(response: 200, description: "Profile Retrived.")
        ]
    )]
   public function getProfile(Request $request){
    $user = Auth::user();
    return $this->successResponse(new UserResource($user),message:"Profile Retrived");

   }
}
