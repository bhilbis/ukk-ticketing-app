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
        ];

        foreach ($types as $type) {
            User::create($type);
        }
    }
}
