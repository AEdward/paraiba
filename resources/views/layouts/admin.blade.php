<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Portal') — Paraiba</title>
    @include('partials.favicons')
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @livewireStyles
    @stack('head')
</head>
@auth
@php
    $editingPage = request()->routeIs('admin.pages.edit') ? optional(request()->route('page'))->slug : null;
    $siteUrl = (str_contains(config('tenancy.root_domain'), '.test') ? 'http' : 'https').'://'.config('tenancy.root_domain');
    $unreadEnquiries = \App\Models\ContactSubmission::where('read', false)->count();

    $navGroups = [
        [
            ['label' => 'Overview', 'icon' => 'home', 'href' => route('admin.dashboard'), 'active' => request()->routeIs('admin.dashboard')],
            ['label' => 'Pages', 'icon' => 'file', 'href' => route('admin.pages.index'), 'active' => request()->routeIs('admin.pages.*') && ! in_array($editingPage, ['solutions', 'services'], true)],
            ['label' => 'Products', 'icon' => 'layers', 'href' => route('admin.products.index'), 'active' => request()->routeIs('admin.products.*')],
            ['label' => 'Industry Solutions', 'icon' => 'grid', 'href' => route('admin.pages.edit', 'solutions'), 'active' => $editingPage === 'solutions'],
            ['label' => 'Services', 'icon' => 'layers', 'href' => route('admin.pages.edit', 'services'), 'active' => $editingPage === 'services'],
            ['label' => 'Careers', 'icon' => 'briefcase', 'href' => route('admin.careers.index'), 'active' => request()->routeIs('admin.careers.*')],
            ['label' => 'Applicants', 'icon' => 'users', 'href' => route('admin.applicants.index'), 'active' => request()->routeIs('admin.applicants.*')],
            ['label' => 'Enquiries', 'icon' => 'mail', 'href' => route('admin.messages.index'), 'active' => request()->routeIs('admin.messages.*'), 'badge' => $unreadEnquiries],
            ['label' => 'Menu', 'icon' => 'list', 'href' => route('admin.menu.index'), 'active' => request()->routeIs('admin.menu.*')],
        ],
        [
            ['label' => 'Users & Roles', 'icon' => 'userCircle', 'href' => route('admin.users.index'), 'active' => request()->routeIs('admin.users.*')],
            ['label' => 'Settings', 'icon' => 'settings', 'href' => route('admin.settings.edit'), 'active' => request()->routeIs('admin.settings.*')],
        ],
    ];
@endphp
<body class="bg-[#F6F8FC] text-slate-900 antialiased" x-data="{ sidebarOpen: false }">
    {{-- Sidebar --}}
    <div x-show="sidebarOpen" x-cloak @click="sidebarOpen = false" class="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"></div>
    <aside :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'" class="fixed inset-y-0 left-0 z-50 w-64 -translate-x-full lg:translate-x-0 transition-transform bg-[#0B1F3F] text-slate-200 flex flex-col">
        <div class="flex items-center justify-between px-6 pt-6 pb-8">
            <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-3">
                <img src="/paraiba-symbol.png" alt="" class="h-10 w-10 object-contain">
                <span class="flex flex-col leading-none">
                    <span class="text-xl font-bold tracking-wide text-white">PARAIBA</span>
                    <span class="text-[9px] font-semibold tracking-[0.3em] text-slate-300 mt-1">TECHNOLOGY PLC</span>
                </span>
            </a>
            <button type="button" @click="sidebarOpen = false" class="lg:hidden text-slate-300" aria-label="Close menu"><x-icon name="x" class="size-5" /></button>
        </div>

        <nav class="flex-1 overflow-y-auto px-3" aria-label="Admin">
            @foreach ($navGroups as $group)
                @if (! $loop->first)<div class="my-4 mx-3 border-t border-white/10"></div>@endif
                <ul class="space-y-1">
                    @foreach ($group as $item)
                        <li>
                            <a href="{{ $item['href'] }}" @if ($item['active']) aria-current="page" @endif
                               class="flex items-center gap-3 rounded-lg px-4 py-2.5 text-[15px] font-medium transition-colors {{ $item['active'] ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-200 hover:bg-white/5 hover:text-white' }}">
                                <x-icon :name="$item['icon']" :stroke="1.7" class="size-5 shrink-0" />
                                <span class="flex-1">{{ $item['label'] }}</span>
                                @if (! empty($item['badge']))
                                    <span class="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">{{ $item['badge'] }}</span>
                                @endif
                            </a>
                        </li>
                    @endforeach
                </ul>
            @endforeach
        </nav>

        <div class="px-5 pb-5 pt-4">
            <a href="{{ $siteUrl }}" target="_blank" rel="noopener" class="flex items-center justify-center gap-2 rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/5 transition-colors">
                View Website <x-icon name="arrowUpRight" class="size-4" />
            </a>
            <div class="mt-5 border-t border-white/10 pt-4" x-data="{ open: false }">
                <button type="button" @click="open = !open" :aria-expanded="open.toString()" class="flex w-full items-center gap-3 text-left">
                    <x-icon name="userCircle" :stroke="1.5" class="size-10 shrink-0 text-slate-300" />
                    <span class="min-w-0 flex-1">
                        <span class="block truncate text-sm font-semibold text-white">{{ auth()->user()->name }}</span>
                        <span class="block truncate text-xs text-slate-400">{{ auth()->user()->email }}</span>
                    </span>
                    <x-icon name="chevronDown" class="size-4 text-slate-400" />
                </button>
                <form x-show="open" x-cloak method="POST" action="{{ route('admin.logout') }}" class="mt-3">
                    @csrf
                    <button type="submit" class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/5">
                        <x-icon name="logOut" class="size-4" /> Log out
                    </button>
                </form>
            </div>
        </div>
    </aside>

    {{-- Main column --}}
    <div class="lg:pl-64 min-h-screen flex flex-col">
        <header class="sticky top-0 z-30 flex items-center gap-4 border-b border-slate-200 bg-white/95 backdrop-blur px-5 lg:px-8 h-16">
            <button type="button" @click="sidebarOpen = true" class="lg:hidden text-slate-600" aria-label="Open menu"><x-icon name="menu" class="size-6" /></button>
            <nav aria-label="Breadcrumb" class="text-[15px] text-slate-500">
                <span>Admin</span>
                <span class="mx-2 text-slate-400">/</span>
                <span class="font-semibold text-blue-600">@yield('title', 'Overview')</span>
            </nav>
            <div class="ml-auto flex items-center gap-5">
                <a href="{{ route('admin.messages.index') }}" class="relative text-slate-600 hover:text-slate-900" aria-label="Enquiries{{ $unreadEnquiries ? ' ('.$unreadEnquiries.' unread)' : '' }}">
                    <x-icon name="bell" :stroke="1.7" class="size-6" />
                    @if ($unreadEnquiries)
                        <span class="absolute -right-1.5 -top-1.5 rounded-full bg-blue-600 px-1.5 text-[10px] font-bold leading-4 text-white">{{ $unreadEnquiries }}</span>
                    @endif
                </a>
                <span class="hidden sm:block h-7 w-px bg-slate-200"></span>
                <div class="hidden sm:flex items-center gap-2.5">
                    <x-icon name="userCircle" :stroke="1.5" class="size-8 text-slate-400" />
                    <span class="text-sm font-semibold text-slate-800">{{ auth()->user()->name }}</span>
                </div>
            </div>
        </header>

        <main class="flex-1">
            @yield('content')
        </main>

        <footer class="border-t border-slate-200 bg-white px-5 lg:px-8 py-4 flex items-center gap-4 text-sm">
            <span class="font-semibold text-slate-800">Paraiba Website CMS</span>
            <span class="h-5 w-px bg-slate-200"></span>
            <span class="text-slate-500">Content management dashboard</span>
        </footer>
    </div>
    @livewireScripts
</body>
@else
<body class="bg-slate-50 text-slate-900">
    @yield('content')
    @livewireScripts
</body>
@endauth
</html>
