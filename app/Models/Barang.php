<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class Barang extends BaseModel
{
    protected $table = 'barang';

    protected $primaryKey = 'kode_barang';


    /** --- Scopes --- */

    /**
     * Filter barang based on request sent by user
     */
    public function scopeFilter(Builder $query, Request $request)
    {
        if (!empty($request->search)) {
            $query->where(function (Builder $query) use ($request) {
                $query->orWhere('kode_barang', 'ILIKE', $request->search);
                $query->orWhere('nama_barang', 'ILIKE', $request->search);
            });
        }

        return $query;
    }
}
