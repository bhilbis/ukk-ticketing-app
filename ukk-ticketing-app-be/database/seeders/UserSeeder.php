<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            [
                'name' => 'admin',
                'email' => 'admin@123.com',
                'password' => bcrypt('admin123'),
                'level_id' => 1,
            ],
            [
                'name' => 'staff',
                'email' => 'staff@123.com',
                'password' => bcrypt('staff123'),
                'level_id' => 2,
            ],
            [
                'name' => 'user',
                'email' => 'user@123.com',
                'password' => bcrypt('user123'),
                'level_id' => 3,
            ]
        ];

        foreach ($types as $type) {
            User::create($type);
        }
    }
}
