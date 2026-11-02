@extends('layouts.site')
@section('title', 'Products — Paraiba Technology PLC')
@section('content')
<div class="mx-auto max-w-5xl px-6 py-16">
    <h1 class="text-3xl font-bold mb-10">Products</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        @foreach ($projects as $project)
            <a href="{{ route('products.show', $project->slug) }}" class="rounded-xl border border-slate-200 p-6 hover:border-slate-300">
                <h3 class="font-bold">{{ $project->name }}</h3>
                <p class="text-sm text-slate-500 mt-1">{{ $project->tagline }}</p>
            </a>
        @endforeach
    </div>
</div>
@endsection
