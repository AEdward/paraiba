<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Contracts\View\View;

class CmsPageController extends Controller
{
    /**
     * Equivalent to getPageBlocks(slug) in the old app — one controller for
     * every block-builder-driven main-site page (404s if unpublished).
     */
    public function show(string $slug): View
    {
        $page = Page::where('slug', $slug)->firstOrFail();

        abort_unless($page->published, 404);

        return view('site.cms-page', ['page' => $page]);
    }
}
