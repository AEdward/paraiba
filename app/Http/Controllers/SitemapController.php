<?php

namespace App\Http\Controllers;

use App\Enums\JobPostingStatus;
use App\Models\JobPosting;
use App\Models\ProductSite;
use App\Models\Project;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * Ports the current sitemap logic, plus fixing two gaps the old app had:
     * job postings and product-subdomain URLs were both missing from it.
     */
    public function __invoke(): Response
    {
        $root = config('tenancy.root_domain');
        $scheme = str_contains($root, '.test') ? 'http' : 'https';
        $base = "{$scheme}://{$root}";

        $staticRoutes = [
            '/', '/about', '/services', '/solutions', '/products', '/work',
            '/partners', '/careers', '/team', '/resources', '/contact',
            '/legal/privacy', '/legal/terms', '/legal/cookies',
        ];

        $urls = collect($staticRoutes)->map(fn ($path) => $base.$path);

        $urls = $urls->concat(
            Project::pluck('slug')->map(fn ($slug) => route('products.show', $slug))
        );

        $urls = $urls->concat(
            JobPosting::where('status', JobPostingStatus::Open)->get()->map(fn ($job) => route('careers.show', $job))
        );

        $urls = $urls->concat(
            ProductSite::pluck('subdomain')->map(fn ($sub) => "{$scheme}://{$sub}.{$root}")
        );

        $xml = view('sitemap', ['urls' => $urls])->render();

        return response($xml, 200)->header('Content-Type', 'application/xml');
    }
}
