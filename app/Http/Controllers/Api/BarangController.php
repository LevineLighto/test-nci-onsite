<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Pagination;
use App\Http\Controllers\Controller;
use App\Models\Barang;
use App\Responses\Success;
use Illuminate\Http\Request;

class BarangController extends Controller
{
    public function get(Request $request)
    {
        $query = Barang::query();

        $query->filter($request);

        [
            'maxPage'   => $max_page,
            'query'     => $query
        ] = Pagination::processRequest($query, $request);


        $barang = $query->get();

        return Success::fetch($barang, $max_page);
    }
}
