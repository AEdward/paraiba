@extends('layouts.admin')

@section('title', 'Dashboard')

@section('content')
<div class="mx-auto max-w-5xl px-6 py-10">
    <div class="flex items-center justify-between mb-8">
        <h1 class="text-xl font-bold">Portal</h1>
        <form method="POST" action="{{ route('admin.logout') }}">
            @csrf
            <button type="submit" class="text-sm text-slate-500 hover:text-slate-900">Log out</button>
        </form>
    </div>
    <p class="text-slate-500">Logged in as {{ auth()->user()->name }} ({{ auth()->user()->email }})</p>
    <p class="mt-4 text-sm text-slate-400">Admin CRUD areas land in Phase 2.</p>
</div>
@endsection
