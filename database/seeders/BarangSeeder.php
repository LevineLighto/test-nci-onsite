<?php

namespace Database\Seeders;

use App\Models\Barang;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (Barang::exists()) {
            return;
        }

        $insertData = [];

        for ($i=0; $i < 100; $i++) { 

            $paddedNumber = str_pad($i + 1, 4, '0', STR_PAD_LEFT);
            $name = fake()->lastName();
            $code = substr($name, 0, 1);

            $insertData[] = [
                'kode_barang'   => "{$code}{$paddedNumber}",
                'nama_barang'   => $name,
                'stok'          => rand(0, 1000),
                'harga'         => rand(1, 1000) * 1000
            ];
        }

        Barang::insert($insertData);
    }
}
