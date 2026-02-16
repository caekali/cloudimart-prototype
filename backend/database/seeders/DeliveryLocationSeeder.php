<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\DeliveryLocation;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeliveryLocationSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $locations = [
            "Mzuzu University",
            "Mzuzu Central Hospital",
            "Luwinga",
            "Area 1B",
            "Kaka"
        ];

        foreach($locations as $loc){
            DeliveryLocation::create(["name" => $loc]);
        }

    }
}
