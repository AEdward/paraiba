<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\ProductSite;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class MicrositeController extends Controller
{
    /**
     * Equivalent to src/app/sites/[subdomain]/page.tsx. The ProductSite was
     * already resolved + bound onto the request by ResolveProductSubdomain.
     */
    public function home(Request $request): View
    {
        /** @var ProductSite $site */
        $site = $request->attributes->get('productSite');

        $shell = in_array($site->subdomain, config('tenancy.bespoke_shells'), true)
            ? $site->subdomain
            : 'generic';

        return view("site.microsites.shells.{$shell}", [
            'site' => $site,
            'page' => $site->homePage(),
        ]);
    }
}
