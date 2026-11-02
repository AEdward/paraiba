<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use Illuminate\Contracts\View\View;

class PartnersController extends Controller
{
    /**
     * Not CMS-block-driven — a direct query, matching the current app
     * (src/app/(site)/partners/page.tsx).
     */
    public function index(): View
    {
        return view('site.partners', [
            'partners' => Partner::orderBy('order')->get(),
        ]);
    }
}
