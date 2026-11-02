<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class RobotsController extends Controller
{
    public function __invoke(): Response
    {
        $root = config('tenancy.root_domain');
        $scheme = str_contains($root, '.test') ? 'http' : 'https';

        $body = "User-agent: *\n".
            "Disallow: /portal\n".
            "Allow: /\n".
            "Sitemap: {$scheme}://{$root}/sitemap.xml\n";

        return response($body, 200)->header('Content-Type', 'text/plain');
    }
}
