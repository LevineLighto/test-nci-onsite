<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detail_transaksi', function (Blueprint $table) {
            $table->string('no_transaksi', 10);
            $table->dateTime('tgl_transaksi');
            $table->string('kode_barang', 5);
            $table->integer('urut');
            $table->decimal('qty', 10, 2)->nullable();
            $table->decimal('harga', 10, 2)->nullable();

            $table->primary(['no_transaksi', 'tgl_transaksi', 'kode_barang', 'urut']);
            $table->foreign(['no_transaksi', 'tgl_transaksi'])->references(['no_transaksi', 'tgl_transaksi'])
                ->on('transaksi');
            $table->foreign(['kode_barang'])->references('kode_barang')
                ->on('barang');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_transaksis');
    }
};
