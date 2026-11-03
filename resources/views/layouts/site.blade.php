<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Paraiba Technology PLC')</title>
    <meta name="description" content="@yield('meta_description', 'Innovative solutions, lasting impact — practical, reliable and beautiful digital products, built out of Addis Ababa.')">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @livewireStyles
    @stack('head')
</head>
<body class="bg-white text-slate-900 antialiased">
    @php
        $headerItems = \App\Models\NavItem::whereIn('location', ['header', 'both'])->orderBy('order')->get();
        $flatHeaderItems = $headerItems->whereNull('group');
        $groupedHeaderItems = $headerItems->whereNotNull('group')->groupBy('group');
    @endphp

    <header class="border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur z-50" x-data="{ mobileOpen: false }">
        <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-6">
            <a href="{{ route('home') }}" class="flex items-center gap-2 shrink-0">
                <img src="/paraiba-symbol.png" alt="Paraiba" class="h-9 w-9 object-contain">
                <span class="flex flex-col leading-none">
                    <span class="font-bold tracking-wide text-slate-900">PARAIBA</span>
                    <span class="text-[9px] font-semibold tracking-[0.2em] text-blue-600">TECHNOLOGY PLC</span>
                </span>
            </a>

            <nav class="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
                <a href="{{ route('home') }}" class="hover:text-blue-600 transition-colors">Home</a>

                <div class="relative" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false" @keydown.escape.window="open = false">
                    <button type="button" @click="open = !open" @focus="open = true" :aria-expanded="open.toString()" aria-haspopup="true" class="flex items-center gap-1 hover:text-blue-600 transition-colors">
                        Products <x-icon name="chevronDown" class="size-3.5" />
                    </button>
                    <div x-show="open" x-cloak @click.outside="open = false" class="absolute left-0 top-full pt-3 w-56">
                        <div class="rounded-xl border border-slate-100 bg-white shadow-lg p-2">
                            <a href="{{ route('products.index') }}#zemen-homes" class="block rounded-lg px-3 py-2 text-sm hover:bg-slate-50">Zemen Homes</a>
                            <a href="{{ route('products.index') }}#niledating" class="block rounded-lg px-3 py-2 text-sm hover:bg-slate-50">NileDating</a>
                        </div>
                    </div>
                </div>

                @foreach ($flatHeaderItems as $item)
                    <a href="{{ $item->href }}" class="hover:text-blue-600 transition-colors">{{ $item->label }}</a>
                @endforeach

                @foreach ($groupedHeaderItems as $group => $items)
                    <div class="relative" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false" @keydown.escape.window="open = false">
                        <button type="button" @click="open = !open" @focus="open = true" :aria-expanded="open.toString()" aria-haspopup="true" class="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            {{ $group }} <x-icon name="chevronDown" class="size-3.5" />
                        </button>
                        <div x-show="open" x-cloak @click.outside="open = false" class="absolute left-0 top-full pt-3 w-56">
                            <div class="rounded-xl border border-slate-100 bg-white shadow-lg p-2">
                                @foreach ($items as $item)
                                    <a href="{{ $item->href }}" class="block rounded-lg px-3 py-2 text-sm hover:bg-slate-50">{{ $item->label }}</a>
                                @endforeach
                            </div>
                        </div>
                    </div>
                @endforeach
            </nav>

            <div class="flex items-center gap-3 shrink-0">
                <a href="{{ route('contact') }}" class="hidden sm:inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50 transition-colors">Contact</a>
                <a href="{{ route('contact') }}" class="hidden lg:inline-flex items-center rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors">Start a Project</a>

                <button type="button" @click="mobileOpen = !mobileOpen" :aria-expanded="mobileOpen.toString()" aria-label="Toggle menu" aria-controls="mobile-nav" class="lg:hidden inline-flex items-center justify-center size-10 rounded-lg border border-slate-300 text-slate-700">
                    <svg x-show="! mobileOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                    <svg x-show="mobileOpen" x-cloak xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
            </div>
        </div>

        <div id="mobile-nav" x-show="mobileOpen" x-cloak @keydown.escape.window="mobileOpen = false" class="lg:hidden border-t border-slate-100 bg-white">
            <nav class="px-6 py-4 flex flex-col gap-1 text-sm font-medium text-slate-700">
                <a href="{{ route('home') }}" class="rounded-lg px-3 py-2.5 hover:bg-slate-50">Home</a>

                <p class="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Products</p>
                <a href="{{ route('products.index') }}#zemen-homes" class="rounded-lg px-3 py-2.5 hover:bg-slate-50">Zemen Homes</a>
                <a href="{{ route('products.index') }}#niledating" class="rounded-lg px-3 py-2.5 hover:bg-slate-50">NileDating</a>

                @foreach ($flatHeaderItems as $item)
                    <a href="{{ $item->href }}" class="rounded-lg px-3 py-2.5 hover:bg-slate-50">{{ $item->label }}</a>
                @endforeach

                @foreach ($groupedHeaderItems as $group => $items)
                    <p class="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{{ $group }}</p>
                    @foreach ($items as $item)
                        <a href="{{ $item->href }}" class="rounded-lg px-3 py-2.5 hover:bg-slate-50">{{ $item->label }}</a>
                    @endforeach
                @endforeach

                <a href="{{ route('contact') }}" class="mt-3 inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 font-semibold">Contact</a>
                <a href="{{ route('contact') }}" class="mt-2 inline-flex items-center justify-center rounded-lg bg-blue-600 text-white px-4 py-2.5 font-semibold">Start a Project</a>
            </nav>
        </div>
    </header>

    <main>
        @yield('content')
    </main>

    @php
        $footerItems = \App\Models\NavItem::whereIn('location', ['footer', 'both'])->orderBy('order')->get()->groupBy(fn ($i) => $i->group ?? 'Company');
        $settings = \App\Models\SiteSettings::current();
    @endphp

    <footer class="bg-slate-950 text-slate-300 mt-16">
        <div class="mx-auto max-w-7xl px-6 py-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10">
            <div class="col-span-2 lg:col-span-1">
                <a href="{{ route('home') }}" class="flex items-center gap-2">
                    <img src="/paraiba-symbol.png" alt="Paraiba" class="h-8 w-8 object-contain">
                    <span class="font-bold tracking-wide text-white">PARAIBA</span>
                </a>
                <p class="text-sm text-slate-400 mt-3">Innovative solutions, lasting impact.</p>
            </div>

            <div>
                <h4 class="text-sm font-semibold text-white mb-3">Products</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="{{ route('products.index') }}#niledating" class="hover:text-white transition-colors">NileDating</a></li>
                    <li><a href="{{ route('products.index') }}#zemen-homes" class="hover:text-white transition-colors">Zemen Homes</a></li>
                </ul>
            </div>

            @foreach ($footerItems as $group => $items)
                <div>
                    <h4 class="text-sm font-semibold text-white mb-3">{{ $group }}</h4>
                    <ul class="space-y-2 text-sm">
                        @foreach ($items as $item)
                            <li><a href="{{ $item->href }}" class="hover:text-white transition-colors">{{ $item->label }}</a></li>
                        @endforeach
                    </ul>
                </div>
            @endforeach

            <div>
                <h4 class="text-sm font-semibold text-white mb-3">Contact</h4>
                <ul class="space-y-2 text-sm text-slate-400">
                    @if ($settings->office_location)<li>{{ $settings->office_location }}</li>@endif
                    @if ($settings->email)<li>{{ $settings->email }}</li>@endif
                    @if ($settings->phone)<li>{{ $settings->phone }}</li>@endif
                </ul>
            </div>
        </div>

        <div class="border-t border-white/10">
            <div class="mx-auto max-w-7xl px-6 py-6 text-sm text-slate-500 flex flex-wrap items-center justify-between gap-3">
                <span>&copy; {{ now()->year }} Paraiba Technology PLC. All rights reserved.</span>
                <div class="flex gap-4">
                    <a href="{{ route('legal.privacy') }}" class="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="{{ route('legal.terms') }}" class="hover:text-white transition-colors">Terms & Conditions</a>
                    <a href="{{ route('legal.cookies') }}" class="hover:text-white transition-colors">Cookie Policy</a>
                </div>
            </div>
        </div>
    </footer>
    @livewireScripts
    @stack('scripts')
</body>
</html>
