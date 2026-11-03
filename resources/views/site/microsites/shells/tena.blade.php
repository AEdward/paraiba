<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $site->name }}</title>
    @include('partials.favicons')
    @if ($site->theme_color)
        <style>:root { --theme-color: {{ $site->theme_color }}; --theme-color-secondary: {{ $site->theme_color_secondary ?? $site->theme_color }}; }</style>
    @endif
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @livewireStyles
    @stack('head')
</head>
<body>
    <header class="border-b border-slate-200">
        <div class="mx-auto max-w-6xl px-6 py-4 flex items-center gap-3">
            @if ($site->logoSrc())<img src="{{ $site->logoSrc() }}" class="h-8">@endif
            <span class="font-bold">{{ $site->name }}</span>
        </div>
    </header>

    @if ($page)
        <x-block-renderer :blocks="$page->blocks" :allowed-types="\App\Support\Blocks\BlockTypeRegistry::MICROSITE_TYPES" />
    @else
        <p class="mx-auto max-w-5xl px-6 py-16 text-slate-400">No content yet.</p>
    @endif

    @livewireScripts
</body>
</html>

