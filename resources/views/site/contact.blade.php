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
        <div>
            <label for="contact-name" class="block text-sm font-medium mb-1">Name</label>
            <input id="contact-name" type="text" name="name" value="{{ old('name') }}" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm">
            @error('name') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
        </div>
        <div>
            <label for="contact-email" class="block text-sm font-medium mb-1">Email</label>
            <input id="contact-email" type="email" name="email" value="{{ old('email') }}" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm">
            @error('email') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
        </div>
        <div>
            <label for="contact-message" class="block text-sm font-medium mb-1">Message</label>
            <textarea id="contact-message" name="message" rows="5" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm">{{ old('message', $role ? "I'm interested in the {$role} role." : '') }}</textarea>
            @error('message') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
        </div>
        <button type="submit" class="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">Send</button>
    </form>
</div>
@endsection
