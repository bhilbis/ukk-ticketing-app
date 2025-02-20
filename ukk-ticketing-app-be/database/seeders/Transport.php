<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransportSeeder extends Seeder
{
    public function run()
    {
        $transports = [
            // Pesawat (type_id = 1)
            [
                'code' => 'PS-0001',
                'name_transport' => 'ATR 72',
                'type_id' => 1,
                'description' => 'Pesawat ATR 72 merupakan pesawat turboprop yang efisien untuk penerbangan jarak pendek.',
                'classes' => [['class_name' => 'Ekonomi', 'seat_count' => '72']]
            ],
            [
                'code' => 'PS-0002',
                'name_transport' => 'Bombardier CRJ1000',
                'type_id' => 1,
                'description' => 'Pesawat Bombardier CRJ1000 menawarkan kenyamanan tinggi dengan efisiensi bahan bakar.',
                'classes' => [['class_name' => 'Ekonomi', 'seat_count' => '100']]
            ],
            [
                'code' => 'PS-0003',
                'name_transport' => 'Airbus A350',
                'type_id' => 1,
                'description' => 'Pesawat berbadan lebar dengan teknologi modern dan kenyamanan maksimal.',
                'classes' => [
                    ['class_name' => 'Ekonomi', 'seat_count' => '300'],
                    ['class_name' => 'Bisnis', 'seat_count' => '50'],
                    ['class_name' => 'First Class', 'seat_count' => '20']
                ]
            ],
            [
                'code' => 'PS-0004',
                'name_transport' => 'Garuda Indonesia (Boeing 777-300ER)',
                'type_id' => 1,
                'description' => 'Pesawat long-haul yang digunakan Garuda Indonesia untuk penerbangan internasional.',
                'classes' => [
                    ['class_name' => 'Ekonomi', 'seat_count' => '314'],
                    ['class_name' => 'Bisnis', 'seat_count' => '42'],
                    ['class_name' => 'First Class', 'seat_count' => '8']
                ]
            ],
            [
                'code' => 'PS-0005',
                'name_transport' => 'Lion Air (Boeing 737-900)',
                'type_id' => 1,
                'description' => 'Pesawat narrow-body yang digunakan untuk penerbangan domestik dan regional.',
                'classes' => [['class_name' => 'Ekonomi', 'seat_count' => '215']]
            ],
            [
                'code' => 'PS-0006',
                'name_transport' => 'Citilink (Airbus A320)',
                'type_id' => 1,
                'description' => 'Pesawat andalan Citilink untuk rute domestik dan regional.',
                'classes' => [['class_name' => 'Ekonomi', 'seat_count' => '180']]
            ],

            // Kereta (type_id = 2)
            [
                'code' => 'KA-0001',
                'name_transport' => 'Kereta Api Reguler',
                'type_id' => 2,
                'description' => 'Kereta api reguler dengan kelas Ekonomi.',
                'classes' => [['class_name' => 'Ekonomi', 'seat_count' => '80']]
            ],
            [
                'code' => 'KA-0002',
                'name_transport' => 'Kereta Api Reguler',
                'type_id' => 2,
                'description' => 'Kereta api reguler dengan kelas Bisnis.',
                'classes' => [['class_name' => 'Bisnis', 'seat_count' => '60']]
            ],
            [
                'code' => 'KA-0003',
                'name_transport' => 'Kereta Api Reguler',
                'type_id' => 2,
                'description' => 'Kereta api reguler dengan kelas Eksekutif.',
                'classes' => [['class_name' => 'Eksekutif', 'seat_count' => '50']]
            ],
            [
                'code' => 'KA-0004',
                'name_transport' => 'Kereta Api Reguler',
                'type_id' => 2,
                'description' => 'Kereta api reguler dengan kelas Luxury.',
                'classes' => [['class_name' => 'Luxury', 'seat_count' => '30']]
            ],
            [
                'code' => 'WHOOSH-01',
                'name_transport' => 'Whoosh',
                'type_id' => 2,
                'description' => 'Kereta cepat Whoosh dengan teknologi modern dan kecepatan tinggi.',
                'classes' => [
                    ['class_name' => 'Premium Ekonomi', 'seat_count' => '100'],
                    ['class_name' => 'Bisnis', 'seat_count' => '50']
                ]
            ],
        ];

        foreach ($transports as $transport) {
            $classes = $transport['classes'];
            unset($transport['classes']);

            $transportId = DB::table('transports')->insertGetId($transport);

            foreach ($classes as $class) {
                DB::table('transport_classes')->insert([
                    'transport_id' => $transportId,
                    'class_name' => $class['class_name'],
                    'seat_count' => $class['seat_count']
                ]);
            }
        }
    }
}
