<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProductSite;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;

class ProductsController extends Controller
{
    public function index(): View
    {
        return view('site.products.index', [
            'projects' => Project::orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * If the slug matches a live ProductSite's subdomain, redirect there
     * instead of rendering a Project detail page.
     */
    public function show(string $slug): View|RedirectResponse
    {
        $site = ProductSite::where('subdomain', $slug)->first();

        if ($site) {
            $root = config('tenancy.root_domain');
            $scheme = str_contains($root, '.test') || str_contains($root, 'localhost') ? 'http' : 'https';

            return redirect()->to("{$scheme}://{$site->subdomain}.{$root}");
        }

        $project = Project::where('slug', $slug)->firstOrFail();

        return view('site.products.show', ['project' => $project]);
    }
}
