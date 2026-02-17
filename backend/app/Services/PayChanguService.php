<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class PayChanguService
{
    public function initiatePayment($reference, $amount, $currency, $customer)
    {
        $payload = [
            'tx_ref' => $reference,
            'amount' => $amount,
            'currency' => $currency,
            'callback_url' => 'https://2e4e-102-70-105-73.ngrok-free.app/checkout/success',
            'return_url' => 'https://2e4e-102-70-105-73.ngrok-free.app/checkout/error',
            'customer' => [
                'email' => $customer->email,
                'name' => $customer->name,
            ],
        ];

        $response = Http::withHeaders([
            'Authorization' => 'Bearer '. env("PAYCHANGU_SECRET_KEY"),
            'Accept' => 'application/json',
                        'Content-Type' => 'application/json',

        ])->post('https://api.paychangu.com/payment', $payload);

        return $response;
    }

    public function verifyPayment($txRef)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' .env("PAYCHANGU_SECRET_KEY"),
            'Accept' => 'application/json',
        ])->get("https://api.paychangu.com/verify-payment/$txRef");

        return $response->json();
    }
}
