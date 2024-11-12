<?php

namespace App\Logics;

use App\Models\DetailTransaksi;
use App\Models\Transaksi;
use App\Responses\Failed;
use App\Responses\Success;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TransaksiLogic
{
    public function create(Request $request)
    {
        DB::beginTransaction();

        try {

            $filterReq = new Request($request->only('no_transaksi'));
            if (Transaksi::filter($filterReq)->exists()) {
                DB::rollBack();
                return Failed::parse('Ada transaksi dengan nomor transaksi yang sama');
            }
    
            $dateTransaksi = Carbon::createFromFormat('d F Y H:i', $request->tgl_transaksi);

            $transaksi = Transaksi::create([
                'no_transaksi'  => $request->no_transaksi,
                'tgl_transaksi' => $dateTransaksi,
                'kode_customer' => $request->customer['kode_customer'],
                'total'         => $request->total,
                'keterangan'    => '',
                'bayar'         => $request->uang_bayar
            ]);

            $detailInsert = [];

            foreach ($request->items as $index => $item) {
                $date = Carbon::createFromFormat('d F Y H:i', $item['date']);

                $detailInsert[] = [
                    'no_transaksi'  => $transaksi->no_transaksi,
                    'tgl_transaksi' => $date,
                    'kode_barang'   => $item['kode_barang'],
                    'urut'          => $index + 1,
                    'qty'           => $item['qty'],
                    'harga'         => $item['harga'],
                ];
            }

            DetailTransaksi::insert($detailInsert);

            DB::commit();

            return Success::create();

        } catch (\Throwable $th) {
            
            DB::rollBack();
            Log::error($th);

            return Failed::parse("Server error", 500);

        }

    }
}