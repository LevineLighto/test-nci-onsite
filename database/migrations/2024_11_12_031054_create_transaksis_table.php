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
        Schema::create('transaksi', function (Blueprint $table) {
            $table->string('no_transaksi', 10);
            $table->dateTime('tgl_transaksi');
            $table->string('kode_customer', 5)->nullable();
            $table->decimal('total', 10, 2)->nullable();
            $table->string('keterangan', 200)->nullable();
            $table->decimal('bayar', 10, 2)->nullable();

            $table->primary(['no_transaksi', 'tgl_transaksi']);
            $table->foreign(['kode_customer'])->references('kode_customer')
                ->on('customer')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksis');
    }
};
