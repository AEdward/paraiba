@php
    $navLinkClass = fn (string $pattern) => request()->routeIs($pattern)
        ? 'text-slate-900 font-semibold'
        : 'hover:text-slate-900';
@endphp
<nav class="border-b border-slate-200 bg-white">
    <div class="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between gap-4">
        <div class="flex items-center gap-5 text-sm font-medium text-slate-600 overflow-x-auto flex-nowrap whitespace-nowrap">
            <a href="{{ route('admin.dashboard') }}" class="font-bold text-slate-900 shrink-0">Portal</a>
            @if (Route::has('admin.pages.index'))<a href="{{ route('admin.pages.index') }}" class="shrink-0 {{ $navLinkClass('admin.pages.*') }}">Pages</a>@endif
            <a href="{{ route('admin.menu.index') }}" class="shrink-0 {{ $navLinkClass('admin.menu.*') }}">Menu</a>
            <a href="{{ route('admin.products.index') }}" class="shrink-0 {{ $navLinkClass('admin.products.*') }}">Products</a>
            @if (Route::has('admin.product-sites.index'))<a href="{{ route('admin.product-sites.index') }}" class="shrink-0 {{ $navLinkClass('admin.product-sites.*') }}">Product Sites</a>@endif
            <a href="{{ route('admin.partners.index') }}" class="shrink-0 {{ $navLinkClass('admin.partners.*') }}">Partners</a>
            <a href="{{ route('admin.careers.index') }}" class="shrink-0 {{ $navLinkClass('admin.careers.*') }}">Careers</a>
            <a href="{{ route('admin.applicants.index') }}" class="shrink-0 {{ $navLinkClass('admin.applicants.*') }}">Applicants</a>
            <a href="{{ route('admin.messages.index') }}" class="shrink-0 {{ $navLinkClass('admin.messages.*') }}">Messages</a>
            <a href="{{ route('admin.settings.edit') }}" class="shrink-0 {{ $navLinkClass('admin.settings.*') }}">Settings</a>
            <a href="{{ route('admin.users.index') }}" class="shrink-0 {{ $navLinkClass('admin.users.*') }}">Users</a>
        </div>
        <form method="POST" action="{{ route('admin.logout') }}" class="shrink-0">
            @csrf
            <button type="submit" class="text-sm text-slate-500 hover:text-slate-900">Log out</button>
        </form>
    </div>
</nav>
