<?php

namespace Database\Seeders;

use App\Models\Levels;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            [
                'level_name' => 'Super Admin',
            ],
            [
                'level_name' => 'Staff',
            ],
            [
                'level_name' => 'Passenger',
            ]
        ];

        foreach ($types as $type) {
            Levels::create($type);
        }
    }
}
