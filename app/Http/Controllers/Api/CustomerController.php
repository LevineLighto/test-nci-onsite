<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Pagination;
use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Responses\Success;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function get(Request $request)
    {
        $query = Customer::query();

        $query->filter($request);

        [
            'maxPage'   => $max_page,
            'query'     => $query
        ] = Pagination::processRequest($query, $request);


        $customers = $query->get();

        return Success::fetch($customers, $max_page);
    }
}
