@extends('layouts.site')
@section('title', 'Contact — Paraiba Technology PLC')

@section('content')
<div class="mx-auto max-w-xl px-6 py-16">
    <h1 class="text-3xl font-bold mb-8">Contact us</h1>

    @if (session('status'))
        <div class="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">{{ session('status') }}</div>
    @endif

    <form method="POST" action="{{ route('contact.store') }}" class="space-y-4">
        @csrf
        <input type="text" name="name" placeholder="Name" value="{{ old('name') }}" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
        @error('name') <p class="text-xs text-red-600">{{ $message }}</p> @enderror
        <input type="email" name="email" placeholder="Email" value="{{ old('email') }}" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
        @error('email') <p class="text-xs text-red-600">{{ $message }}</p> @enderror
        <textarea name="message" rows="5" placeholder="Message" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">{{ old('message', $role ? "I'm interested in the {$role} role." : '') }}</textarea>
        @error('message') <p class="text-xs text-red-600">{{ $message }}</p> @enderror
        <button type="submit" class="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">Send</button>
    </form>
</div>
@endsection
