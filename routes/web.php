<?php

use App\Http\Controllers\Admin\ApplicationDocumentController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\RobotsController;
use App\Http\Controllers\Site\CareersController;
use App\Http\Controllers\Site\CmsPageController;
use App\Http\Controllers\Site\ContactController;
use App\Http\Controllers\Site\LegalController;
use App\Http\Controllers\Site\MicrositeController;
use App\Http\Controllers\Site\ProductsController;
use App\Http\Controllers\SitemapController;
use App\Models\JobPosting;
use App\Models\NavItem;
use App\Models\Page;
use App\Models\Partner;
use App\Models\ProductSite;
use App\Models\Project;
use Illuminate\Support\Facades\Route;

$root = config('tenancy.root_domain');

/*
|--------------------------------------------------------------------------
| Portal (admin) subdomain — portal.<root>
|--------------------------------------------------------------------------
| Admin CMS lives at the root path here, no /admin prefix in the URL,
| mirroring src/proxy.ts's portal-host rewrite in the Next.js app. The
| legacy paraibatech.com/admin path simply has no route at all in this app.
*/
Route::domain("portal.{$root}")->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->middleware('guest')->name('admin.login');
    Route::post('/login', [AuthController::class, 'login'])->middleware('guest')->name('admin.login.attempt');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('admin.logout');

    Route::middleware('auth')->group(function () {
        Route::get('/', DashboardController::class)->name('admin.dashboard');

        Route::get('/menu', fn () => view('admin.menu.index'))->name('admin.menu.index');
        Route::get('/menu/new', fn () => view('admin.menu.create'))->name('admin.menu.create');
        Route::get('/menu/{item}/edit', fn (NavItem $item) => view('admin.menu.edit', compact('item')))->name('admin.menu.edit');

        Route::get('/products', fn () => view('admin.products.index'))->name('admin.products.index');
        Route::get('/products/new', fn () => view('admin.products.create'))->name('admin.products.create');
        Route::get('/products/{project}/edit', fn (Project $project) => view('admin.products.edit', compact('project')))->name('admin.products.edit');

        Route::get('/partners', fn () => view('admin.partners.index'))->name('admin.partners.index');
        Route::get('/partners/new', fn () => view('admin.partners.create'))->name('admin.partners.create');
        Route::get('/partners/{partner}/edit', fn (Partner $partner) => view('admin.partners.edit', compact('partner')))->name('admin.partners.edit');

        Route::get('/careers', fn () => view('admin.careers.index'))->name('admin.careers.index');
        Route::get('/careers/new', fn () => view('admin.careers.create'))->name('admin.careers.create');
        Route::get('/careers/{posting}/edit', fn (JobPosting $posting) => view('admin.careers.edit', compact('posting')))->name('admin.careers.edit');

        Route::get('/applicants', fn () => view('admin.applicants.index'))->name('admin.applicants.index');
        Route::get('/documents/{document}', [ApplicationDocumentController::class, 'show'])->name('admin.documents.show');

        Route::get('/messages', fn () => view('admin.messages.index'))->name('admin.messages.index');

        Route::get('/settings', fn () => view('admin.settings.edit'))->name('admin.settings.edit');

        Route::get('/users', fn () => view('admin.users.index'))->name('admin.users.index');

        Route::get('/pages', fn () => view('admin.pages.index'))->name('admin.pages.index');
        Route::get('/pages/{page:slug}', fn (Page $page) => view('admin.pages.edit', compact('page')))->name('admin.pages.edit');

        Route::get('/product-sites', fn () => view('admin.product-sites.index'))->name('admin.product-sites.index');
        Route::get('/product-sites/new', fn () => view('admin.product-sites.create'))->name('admin.product-sites.create');
        Route::get('/product-sites/{site}/edit', fn (ProductSite $site) => view('admin.product-sites.edit', compact('site')))->name('admin.product-sites.edit');
    });
});

/*
|--------------------------------------------------------------------------
| Product subdomains — {subdomain}.<root>
|--------------------------------------------------------------------------
| Reserved-label denylist + ProductSite lookup happens in
| ResolveProductSubdomain (tenant.product), matching src/lib/subdomain.ts.
*/
Route::domain('{subdomain}.'.$root)
    ->middleware('tenant.product')
    ->group(function () {
        Route::get('/', [MicrositeController::class, 'home'])->name('microsite.home');
    });

/*
|--------------------------------------------------------------------------
| Apex / www — main public site
|--------------------------------------------------------------------------
*/
Route::domain($root)->group(function () {
    Route::get('/', fn () => app(CmsPageController::class)->show('home'))->name('home');
    Route::get('/about', fn () => app(CmsPageController::class)->show('about'))->name('about');
    Route::get('/services', fn () => app(CmsPageController::class)->show('services'))->name('services');
    Route::get('/solutions', fn () => app(CmsPageController::class)->show('solutions'))->name('solutions');

    Route::get('/products', [ProductsController::class, 'index'])->name('products.index');
    Route::get('/products/{slug}', [ProductsController::class, 'show'])->name('products.show');

    Route::get('/careers', [CareersController::class, 'index'])->name('careers.index');
    Route::get('/careers/{job}', [CareersController::class, 'show'])->name('careers.show');

    Route::get('/contact', [ContactController::class, 'show'])->name('contact');
    Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

    Route::get('/legal/privacy', [LegalController::class, 'privacy'])->name('legal.privacy');
    Route::get('/legal/terms', [LegalController::class, 'terms'])->name('legal.terms');
    Route::get('/legal/cookies', [LegalController::class, 'cookies'])->name('legal.cookies');

    Route::get('/sitemap.xml', SitemapController::class);
    Route::get('/robots.txt', RobotsController::class);

    // Local-dev / fallback path parity with the Next.js app's /sites/<subdomain>.
    Route::get('/sites/{subdomain}', [MicrositeController::class, 'home'])
        ->middleware('tenant.product');
});

Route::domain("www.{$root}")->group(function () use ($root) {
    Route::get('/', function () use ($root) {
        return redirect()->to("http://{$root}");
    });
});
