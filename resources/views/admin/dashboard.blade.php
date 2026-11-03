@extends('layouts.admin')

@section('title', 'Overview')

@section('content')
@php
    $siteUrl = (str_contains(config('tenancy.root_domain'), '.test') ? 'http' : 'https').'://'.config('tenancy.root_domain');
    $updatedLabel = function ($date) {
        if (! $date) return '—';
        if ($date->isToday()) return 'Today';
        if ($date->isYesterday()) return 'Yesterday';
        return $date->format('M j, Y');
    };
@endphp
<div class="px-5 lg:px-8 py-7 space-y-6">
    {{-- Title row --}}
    <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14284B]">Website Overview</h1>
            <p class="mt-1 text-lg text-slate-600">Manage your content and keep Paraiba up to date.</p>
        </div>
        <div class="flex flex-wrap gap-3">
            <a href="{{ route('admin.pages.index') }}" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-colors">
                <x-icon name="plus" class="size-5" /> Create Content
            </a>
            <a href="{{ $siteUrl }}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-800 hover:bg-slate-50 transition-colors">
                View Website <x-icon name="arrowUpRight" class="size-4" />
            </a>
        </div>
    </div>

    {{-- Stats --}}
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        @foreach ($stats as $stat)
            <div class="flex items-center gap-5 rounded-xl border border-slate-200 bg-white px-6 py-5">
                <x-icon :name="$stat['icon']" :stroke="1.5" class="size-10 shrink-0 text-blue-600" />
                <div>
                    <p class="text-[15px] font-semibold text-slate-800">{{ $stat['label'] }}</p>
                    <p class="text-3xl font-bold text-[#14284B] leading-tight">{{ $stat['value'] }}</p>
                </div>
            </div>
        @endforeach
    </div>

    <div class="grid xl:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] gap-6 items-start">
        {{-- Website pages --}}
        <section class="rounded-xl border border-slate-200 bg-white p-5">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-bold tracking-tight text-[#14284B]">Website Pages</h2>
                <a href="{{ route('admin.pages.index') }}" class="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">Manage pages <x-icon name="arrowUpRight" class="size-4" /></a>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-[15px]">
                    <thead>
                        <tr class="bg-slate-100 text-left text-slate-700">
                            <th scope="col" class="rounded-l-lg px-4 py-3 font-semibold">Page</th>
                            <th scope="col" class="px-4 py-3 font-semibold">Status</th>
                            <th scope="col" class="px-4 py-3 font-semibold">Last Updated</th>
                            <th scope="col" class="rounded-r-lg px-4 py-3 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @forelse ($pages as $page)
                            <tr>
                                <td class="px-4 py-3"><a href="{{ route('admin.pages.edit', $page) }}" class="font-medium text-blue-600 hover:underline">{{ $page->title }}</a></td>
                                <td class="px-4 py-3">
                                    @if ($page->published)
                                        <span class="inline-flex items-center gap-1.5 rounded-md bg-green-50 px-2.5 py-1 text-sm font-medium text-green-700"><span class="size-2 rounded-full bg-green-500"></span>Published</span>
                                    @else
                                        <span class="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-600"><span class="size-2 rounded-full bg-slate-400"></span>Draft</span>
                                    @endif
                                </td>
                                <td class="px-4 py-3 text-slate-600">{{ $updatedLabel($page->updated_at) }}</td>
                                <td class="px-4 py-3 text-center">
                                    <a href="{{ route('admin.pages.edit', $page) }}" class="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-blue-600 hover:bg-blue-50" aria-label="Edit {{ $page->title }}">
                                        <x-icon name="pencil" class="size-4" />
                                    </a>
                                </td>
                            </tr>
                        @empty
                            <tr><td colspan="4" class="px-4 py-6 text-center text-slate-500">No pages yet.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </section>

        <div class="space-y-6">
            {{-- Quick actions --}}
            <section class="rounded-xl border border-slate-200 bg-white p-5">
                <h2 class="text-2xl font-bold tracking-tight text-[#14284B] mb-3">Quick Actions</h2>
                @php
                    $actions = [
                        ['label' => 'Edit Homepage', 'icon' => 'home', 'href' => route('admin.pages.edit', 'home')],
                        ['label' => 'Edit Industry Solutions', 'icon' => 'grid', 'href' => route('admin.pages.edit', 'solutions')],
                        ['label' => 'Post a Job', 'icon' => 'plus', 'href' => route('admin.careers.create')],
                        ['label' => 'Site Settings', 'icon' => 'settings', 'href' => route('admin.settings.edit')],
                    ];
                @endphp
                <ul class="divide-y divide-slate-100 rounded-lg border border-slate-200">
                    @foreach ($actions as $action)
                        <li>
                            <a href="{{ $action['href'] }}" class="flex items-center gap-4 px-4 py-2.5 text-[15px] font-medium text-slate-800 hover:bg-slate-50">
                                <x-icon :name="$action['icon']" :stroke="1.7" class="size-5 text-blue-600" />
                                <span class="flex-1">{{ $action['label'] }}</span>
                                <x-icon name="chevronRight" class="size-4 text-slate-500" />
                            </a>
                        </li>
                    @endforeach
                </ul>
            </section>

            {{-- Publishing checklist --}}
            <section class="rounded-xl border border-slate-200 bg-white p-5">
                <h2 class="text-2xl font-bold tracking-tight text-[#14284B] mb-3">Publishing Checklist</h2>
                <ul class="space-y-2.5">
                    @foreach ($checklist as $check)
                        <li class="flex items-center gap-3 text-[15px] text-slate-700">
                            @if ($check['done'])
                                <span class="inline-flex size-5 items-center justify-center rounded bg-green-600 text-white"><x-icon name="check" :stroke="3" class="size-3.5" /></span>
                            @else
                                <span class="size-5 rounded border-2 border-slate-300"></span>
                            @endif
                            <span>{{ $check['label'] }}</span>
                            <span class="sr-only">{{ $check['done'] ? '(done)' : '(not done)' }}</span>
                        </li>
                    @endforeach
                </ul>
            </section>
        </div>
    </div>

    <div class="grid xl:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] gap-6 items-start">
        {{-- Featured products --}}
        <section class="rounded-xl border border-slate-200 bg-white p-5">
            <h2 class="text-2xl font-bold tracking-tight text-[#14284B] mb-2">Featured Products</h2>
            <ul class="divide-y divide-slate-100">
                @forelse ($products as $product)
                    <li class="flex flex-wrap items-center gap-5 py-4">
                        <x-icon :name="$product['icon']" :stroke="1.6" class="size-9 shrink-0 text-blue-600" />
                        <div class="min-w-0 flex-1">
                            <p class="text-lg font-semibold text-[#14284B]">{{ $product['name'] }}</p>
                            <p class="text-sm text-slate-600">{{ $product['tagline'] }}</p>
                        </div>
                        <span class="inline-flex items-center gap-1.5 rounded-md bg-green-50 px-2.5 py-1 text-sm font-medium text-green-700"><span class="size-2 rounded-full bg-green-500"></span>Published</span>
                        <a href="{{ route('admin.pages.edit', 'home') }}" class="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                            <x-icon name="pencil" class="size-4 text-blue-600" /> Edit
                        </a>
                    </li>
                @empty
                    <li class="py-6 text-center text-slate-500">No products on the homepage yet.</li>
                @endforelse
            </ul>
        </section>

        {{-- Recent enquiries --}}
        <section class="rounded-xl border border-slate-200 bg-white p-5">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 class="text-2xl font-bold tracking-tight text-[#14284B]">Recent Enquiries</h2>
                @if ($enquiries->isNotEmpty())
                    <a href="{{ route('admin.messages.index') }}" class="text-sm font-semibold text-blue-600 hover:text-blue-700">View all</a>
                @endif
            </div>
            @if ($enquiries->isEmpty())
                <div class="flex flex-col items-center py-8 text-center">
                    <x-icon name="inbox" :stroke="1.4" class="size-14 text-slate-400" />
                    <p class="mt-3 text-xl font-bold text-[#14284B]">No new enquiries</p>
                    <p class="text-slate-600">Website messages will appear here.</p>
                </div>
            @else
                <ul class="divide-y divide-slate-100">
                    @foreach ($enquiries as $enquiry)
                        <li class="py-3">
                            <div class="flex items-center gap-2">
                                @unless ($enquiry->read)<span class="size-2 rounded-full bg-blue-600" aria-label="Unread"></span>@endunless
                                <p class="font-semibold text-slate-800 truncate">{{ $enquiry->name }}</p>
                                <span class="ml-auto shrink-0 text-xs text-slate-500">{{ $enquiry->created_at?->diffForHumans() }}</span>
                            </div>
                            <p class="mt-0.5 text-sm text-slate-600 line-clamp-2">{{ $enquiry->message }}</p>
                        </li>
                    @endforeach
                </ul>
            @endif
        </section>
    </div>
</div>
@endsection
