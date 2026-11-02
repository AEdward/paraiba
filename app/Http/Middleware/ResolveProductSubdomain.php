<?php

namespace App\Http\Middleware;

use App\Models\ProductSite;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Equivalent to src/lib/subdomain.ts's getProductSubdomain() + the DB
 * lookup that follows it in src/app/sites/[subdomain]/layout.tsx.
 *
 * Route::domain('{subdomain}.'.root_domain) already captured the label as
 * a route parameter — this middleware rejects reserved labels before any
 * query, then resolves + binds the matching ProductSite (404 if none).
 */
class ResolveProductSubdomain
{
    public function handle(Request $request, Closure $next): Response
    {
        $subdomain = $request->route('subdomain');

        if (in_array($subdomain, config('tenancy.reserved_subdomains'), true)) {
            abort(404);
        }

        $site = ProductSite::where('subdomain', $subdomain)->first();

        if (! $site) {
            abort(404);
        }

        $request->attributes->set('productSite', $site);

        return $next($request);
    }
}
