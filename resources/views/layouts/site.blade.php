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
<body class="bg-white text-slate-900">
    <header class="border-b border-slate-200">
        <div class="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <a href="{{ route('home') }}" class="font-bold">Paraiba Technology PLC</a>
            <nav class="flex gap-5 text-sm">
                <a href="{{ route('products.index') }}">Products</a>
                <a href="{{ route('careers.index') }}">Careers</a>
                <a href="{{ route('partners.index') }}">Partners</a>
                <a href="{{ route('contact') }}">Contact</a>
            </nav>
        </div>
    </header>

    <main>
        @yield('content')
    </main>

    <footer class="border-t border-slate-200 mt-16">
        <div class="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-500 flex items-center justify-between">
            <span>&copy; {{ now()->year }} Paraiba Technology PLC. All rights reserved.</span>
            <div class="flex gap-4">
                <a href="{{ route('legal.privacy') }}">Privacy</a>
                <a href="{{ route('legal.terms') }}">Terms</a>
                <a href="{{ route('legal.cookies') }}">Cookies</a>
            </div>
        </div>
    </footer>
    @livewireScripts
</body>
</html>
