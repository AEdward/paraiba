@extends('layouts.admin')

@section('title', 'Dashboard')

@section('content')
@include('admin.partials.nav')
<div class="mx-auto max-w-5xl px-6 py-10">
    <h1 class="text-xl font-bold mb-4">Dashboard</h1>
    <p class="text-slate-500">Logged in as {{ auth()->user()->name }} ({{ auth()->user()->email }})</p>
</div>
@endsection
