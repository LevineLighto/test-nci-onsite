<?php

namespace App\Responses;

class Failed
{
    public static function parse (string    $message, 
                                  ?int      $code = 400)
    {
        return response()->json(['message' => $message], $code);
    }

    public static function unauthorized ()
    {
        return static::parse("You don't have permission to access this", 401);
    }

    public static function notFound ()
    {
        return static::parse("Cannot find the data", 404);
    }
}
