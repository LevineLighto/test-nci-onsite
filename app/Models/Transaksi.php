<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class Transaksi extends BaseModel
{
    protected $table = 'transaksi';

    protected $primaryKey = ['no_transaksi', 'tgl_transaksi'];

    protected $fillable = [
        'no_transaksi',
        'tgl_transaksi',
        'kode_customer',
        'total',
        'keterangan',
        'bayar'
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

        return $query;
    }
}
