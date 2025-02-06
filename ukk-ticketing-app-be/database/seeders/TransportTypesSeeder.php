<?php

namespace Database\Seeders;

use App\Models\TransportTypes;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransportTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            [
                'type_name' => 'Pesawat',
                'description' => 'Transportasi udara menggunakan pesawat terbang'
            ],
            [
                'type_name' => 'Kereta Api',
                'description' => 'Transportasi darat menggunakan rel kereta api'
            ]
        ];

        foreach ($types as $type) {
            TransportTypes::create($type);
        }
    }
}
