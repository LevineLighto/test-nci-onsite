<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function get(Request $request)
    {
        $query = Customer::query();

        $query->filter($request);
    }
}
