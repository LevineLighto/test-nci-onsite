<?php

namespace App\Responses;

class Success
{
    public static function parse (string   $message,
                                  mixed    $data    = null,
                                  ?int     $maxPage = 1)
    {
        return response()->json([
            'message'   => $message,
            'data'      => $data,
            'max_page'  => $maxPage,
        ]);
    }

    public static function fetch(mixed  $data    = null, 
                                 ?int   $maxPage = 1)
    {
        return static::parse('Data successfully fetched', $data, $maxPage);
    }

    public static function create(mixed $data = null)
    {
        return static::parse('Data berhasil disimpan', $data);
    }

    public static function update(mixed $data = null)
    {
        return static::parse('Data successfully updated', $data);
    }

    public static function delete(mixed $data = null)
    {
        return static::parse('Data successfully deleted', $data);
    }
}
