@extends('layouts.site')
@section('title', $project->name . ' — Paraiba Technology PLC')
@section('meta_description', $project->tagline)
@section('content')
<div class="mx-auto max-w-3xl px-6 py-16">
    @if ($project->screenshotSrc())
        <img src="{{ $project->screenshotSrc() }}" alt="{{ $project->name }}" class="rounded-xl border border-slate-200 mb-8">
    @endif
    <h1 class="text-3xl font-bold">{{ $project->name }}</h1>
    <p class="text-slate-500 mt-2">{{ $project->tagline }}</p>
    <div class="prose max-w-none mt-8"><p>{{ $project->description }}</p></div>
    @if ($project->link)
        <a href="{{ $project->link }}" target="_blank" rel="noopener" class="inline-block mt-6 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white">Visit project</a>
    @endif
</div>
@endsection
