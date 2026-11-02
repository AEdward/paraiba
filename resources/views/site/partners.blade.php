@extends('layouts.site')
@section('title', 'Partners — Paraiba Technology PLC')

@section('content')
<div class="mx-auto max-w-5xl px-6 py-16">
    <h1 class="text-3xl font-bold mb-10">Partners</h1>

    @if ($partners->isEmpty())
        <p class="text-slate-500">We're building out our partner network — check back soon.</p>
    @else
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-8">
            @foreach ($partners as $partner)
                <a href="{{ $partner->website }}" target="_blank" rel="noopener" class="flex items-center justify-center rounded-xl border border-slate-200 p-6 hover:border-slate-300">
                    @if ($partner->logoSrc())
                        <img src="{{ $partner->logoSrc() }}" alt="{{ $partner->name }}" class="max-h-12">
                    @else
                        <span class="font-medium">{{ $partner->name }}</span>
                    @endif
                </a>
            @endforeach
        </div>
    @endif
</div>
@endsection
