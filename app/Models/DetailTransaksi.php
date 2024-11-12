<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class DetailTransaksi extends BaseModel
{
    protected $table = 'detail_transaksi';

    protected $primaryKey = ['no_transaksi', 'tgl_transaksi', 'kode_barang', 'urut'];
    protected $incrementing = false;


    /** --- Scopes --- */

    /**
     * Filter detail transaksi based on request sent by user
     */
    public function scopeFilter(Builder $query, Request $request)
    {
        if (!empty($request->no_transaksi)) {
            $query->where('no_transaksi', $request->no_transaksi);
        }

        if (!empty($request->tgl_transaksi)) {
            $query->where('tgl_transaksi', $request->tgl_transaksi);
        }

        if (!empty($request->kode_barang)) {
            $query->where('kode_barang', $request->tgl_transaksi);
        }

        return $query;
    }
}
