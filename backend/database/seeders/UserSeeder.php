<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Caesar Customer',
                'email' => 'customer@example.com',
                'phone' => '265993590203',
                'role' => 'customer',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'John Admin',
                'email' => 'admin@example.com',
                'phone' => '0999000002',
                'role' => 'admin',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Frank Delivery',
                'email' => 'delivery@example.com',
                'phone' => '0999000003',
                'role' => 'delivery_person',
                'password' => Hash::make('password'),
            ],
        ]);
    }
}
