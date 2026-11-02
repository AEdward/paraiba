@php($settings = \App\Models\SiteSettings::current())
<section class="py-16 bg-slate-950 text-white">
    <div class="mx-auto max-w-2xl px-6 text-center">
        @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase tracking-wide text-blue-400">{{ $data['eyebrow'] }}</p>@endif
        @if (! empty($data['heading']))<h2 class="text-2xl sm:text-3xl font-bold mt-2 mb-6">{{ $data['heading'] }}</h2>@endif
        <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-300 mb-8">
            @if ($settings->office_location)<span class="inline-flex items-center gap-2"><x-icon name="compass" class="size-4" />{{ $settings->office_location }}</span>@endif
            @if ($settings->email)<span>{{ $settings->email }}</span>@endif
            @if ($settings->phone)<span>{{ $settings->phone }}</span>@endif
        </div>
        <a href="{{ route('contact') }}" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors">
            Get in touch <x-icon name="arrowRight" class="size-4" />
        </a>
    </div>
</section>
