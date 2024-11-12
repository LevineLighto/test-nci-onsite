<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TransaksiRequest;
use App\Logics\TransaksiLogic;
use Illuminate\Http\Request;

class TransaksiController extends Controller
{
    public function create(TransaksiRequest $request)
    {
        return (new TransaksiLogic)->create($request);
    }
}
