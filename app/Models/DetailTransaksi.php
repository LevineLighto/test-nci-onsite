<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class DetailTransaksi extends BaseModel
{
    protected $table = 'detail_transaksi';

    protected $primaryKey = ['no_transaksi', 'tgl_transaksi', 'kode_barang', 'urut'];

    protected $fillable = [
        'no_transaksi',
        'tgl_transaksi',
        'kode_barang',
        'urut',
        'qty',
        'harga'
    ];



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
            $date = Carbon::createFromFormat('d F Y H:i', $request->tgl_transaksi);
            $query->where('tgl_transaksi', $date);
        }

        if (!empty($request->kode_barang)) {
            $query->where('kode_barang', $request->tgl_transaksi);
        }

        return $query;
    }
}
