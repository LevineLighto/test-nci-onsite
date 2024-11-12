<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class Customer extends BaseModel
{
    protected $table = 'customer';

    protected $primaryKey = 'kode_customer';


    /** --- Scopes --- */

    /**
     * Filter customer based on request sent by user
     */
    public function scopeFilter(Builder $query, Request $request)
    {
        if (!empty($request->search)) {
            $query->where(function (Builder $query) use ($request) {
                $query->orWhere('kode_customer', 'ILIKE', $request->search);
                $query->orWhere('nama_customer', 'ILIKE', $request->search);
            });
        }

        return $query;
    }
}
