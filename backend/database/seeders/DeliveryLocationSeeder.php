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
        ["name" => "Mzuzu University", "code" => "MZ"],
        ["name" => "Mzuzu Central Hospital", "code" => "MCH"],
        ["name" => "Luwinga", "code" => "LA"],
        ["name" => "Area 1B", "code" => "A1B"],
        ["name" => "Kaka", "code" => "KK"],
    ];

    foreach ($locations as $loc) {
        DeliveryLocation::create([
            "name" => $loc['name'],
            "code" => $loc['code']
        ]);
    }

    }
}
