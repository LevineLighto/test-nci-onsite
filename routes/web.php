<?php

use App\Http\Controllers\Api\BarangController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\TransaksiController;
use App\Http\Controllers\Web\Controller;
use Illuminate\Support\Facades\Route;

Route::get('/', [Controller::class, 'index']);

Route::get('customer', [CustomerController::class, 'get']);
Route::get('barang', [BarangController::class, 'get']);
Route::post('transaksi', [TransaksiController::class, 'create']);
