@extends('layouts.site')
@section('title', $job->title . ' — Paraiba Technology PLC')
@section('meta_description', $job->description)

@section('content')
<div class="mx-auto max-w-3xl px-6 py-16">
    <a href="{{ route('careers.index') }}" class="text-sm text-slate-500">&larr; Back to careers</a>

    <h1 class="text-3xl font-bold mt-4">{{ $job->title }}</h1>
    <p class="text-slate-500 mt-2">{{ $job->category }} · {{ $job->location }} · {{ $job->type->value }} · {{ $job->work_mode->value }}</p>

    <div class="mt-8 prose max-w-none">
        <p>{{ $job->description }}</p>

        @if ($job->about_role)
            <h2>About the role</h2>
            <p>{{ $job->about_role }}</p>
        @endif

        @if ($job->responsibilitiesList())
            <h2>What you'll do</h2>
            <ul>
                @foreach ($job->responsibilitiesList() as $line)<li>{{ $line }}</li>@endforeach
            </ul>
        @endif

        @if ($job->niceToHaveList())
            <h2>Nice to have</h2>
            <ul>
                @foreach ($job->niceToHaveList() as $line)<li>{{ $line }}</li>@endforeach
            </ul>
        @endif

        @if ($job->techStackList())
            <h2>Tech stack</h2>
            <p>{{ implode(', ', $job->techStackList()) }}</p>
        @endif

        @if ($job->how_to_apply)
            <h2>How to apply</h2>
            <p>{{ $job->how_to_apply }}</p>
        @endif
    </div>

    <div class="mt-10 rounded-xl border border-slate-200 p-6">
        <h2 class="font-bold mb-4">Apply for this role</h2>
        <livewire:site.application-form :job="$job" />
    </div>
</div>
@endsection
