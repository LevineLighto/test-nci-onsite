<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (Customer::exists()) {
            return;
        }

        $insertData = [];

        for ($i=0; $i < 100; $i++) { 

            $paddedNumber = str_pad($i + 1, 4, '0', STR_PAD_LEFT);
            $insertData[] = [
                'kode_customer' => "C{$paddedNumber}",
                'nama_customer' => fake()->name(),
                'alamat'        => fake()->address(),
            ];
        }

        Customer::insert($insertData);
    }
}
