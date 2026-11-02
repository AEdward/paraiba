<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Site\MicrositeController;
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
        // Admin CRUD route groups (Pages, Products, Partners, Careers, ...) land in Phase 2.
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
    Route::get('/', function () {
        return 'Paraiba public site — Phase 4/5/6 build out the real pages.';
    })->name('home');

    // Local-dev / fallback path parity with the Next.js app's /sites/<subdomain>.
    Route::get('/sites/{subdomain}', [MicrositeController::class, 'home'])
        ->middleware('tenant.product');
});

Route::domain("www.{$root}")->group(function () use ($root) {
    Route::get('/', function () use ($root) {
        return redirect()->to("http://{$root}");
    });
});
