<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller as BaseController;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Controller extends BaseController
{
    public function index()
    {
        return Inertia::render('App');
    }
}
