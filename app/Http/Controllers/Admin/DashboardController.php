<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use App\Models\Page;
use App\Models\SiteSettings;
use Illuminate\Contracts\View\View;

class DashboardController extends Controller
{
    public function __invoke(): View
    {
        $order = array_flip(['home', 'products', 'solutions', 'services', 'about', 'careers', 'contact']);
        $pages = Page::all()->sortBy(fn (Page $page) => $order[$page->slug] ?? PHP_INT_MAX)->values();

        $home = $pages->firstWhere('slug', 'home');
        $products = collect(optional($home?->blocks()->where('type', 'productsSpotlight')->first())->data['items'] ?? [])
            ->map(fn (array $item) => [
                'name' => trim(($item['name'] ?? '').($item['nameAccent'] ?? '')),
                'tagline' => $item['tagline'] ?? '',
                'icon' => ($item['device'] ?? 'laptop') === 'phone' ? 'heart' : 'home',
                'href' => $item['buttonHref'] ?? '',
            ]);

        $solutions = $pages->firstWhere('slug', 'solutions');
        $industryCount = count(optional($solutions?->blocks()->where('type', 'challengeGrid')->first())->data['items'] ?? []);

        $settings = SiteSettings::current();

        $checklist = [
            ['label' => 'Homepage published', 'done' => (bool) $home?->published],
            ['label' => 'Product links set', 'done' => $products->isNotEmpty() && $products->every(fn ($p) => str_starts_with($p['href'], 'http'))],
            ['label' => 'Contact details added', 'done' => filled($settings->email) && filled($settings->phone)],
            ['label' => 'All pages published', 'done' => $pages->isNotEmpty() && $pages->every->published],
        ];

        return view('admin.dashboard', [
            'pages' => $pages,
            'products' => $products,
            'stats' => [
                ['label' => 'Published Pages', 'value' => $pages->where('published', true)->count(), 'icon' => 'file'],
                ['label' => 'Products', 'value' => $products->count(), 'icon' => 'layers'],
                ['label' => 'Industry Solutions', 'value' => $industryCount, 'icon' => 'grid'],
                ['label' => 'New Enquiries', 'value' => ContactSubmission::where('read', false)->count(), 'icon' => 'mail'],
            ],
            'checklist' => $checklist,
            'enquiries' => ContactSubmission::latest('created_at')->limit(5)->get(),
        ]);
    }
}
