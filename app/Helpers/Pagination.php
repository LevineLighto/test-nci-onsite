<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;

class Pagination 
{
    const DEFAULT_PAGE = 1;
    const DEFAULT_LIMIT = 24;

    public static function process (Builder|Relation $query, 
                                    ?int $page  = self::DEFAULT_PAGE, 
                                    ?int $limit = self::DEFAULT_LIMIT)
    {
        $entries    = (clone $query)->count();
        $totalPage  = ceil($entries / $limit);

        $skip = $limit * ($page - 1);

        $query->skip($skip)->take($limit);

        return ['maxPage' => $totalPage, 'query' => $query];
    }

    public static function processRequest(Builder|Relation $query, Request $request)
    {
        $page   = $request->integer('page', self::DEFAULT_PAGE);
        $limit  = $request->integer('limit', self::DEFAULT_LIMIT);

        return static::process($query, $page, $limit);
    }
}
