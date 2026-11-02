@php($settings = \App\Models\SiteSettings::current())
<section class="py-16 bg-slate-50">
    <div class="mx-auto max-w-2xl px-6 text-center">
        @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase text-blue-600">{{ $data['eyebrow'] }}</p>@endif
        @if (! empty($data['heading']))<h2 class="text-2xl font-bold mt-2 mb-6">{{ $data['heading'] }}</h2>@endif
        <p class="text-sm text-slate-500 mb-6">{{ $settings->office_location }} · {{ $settings->email }} @if($settings->phone) · {{ $settings->phone }} @endif</p>
        <a href="{{ route('contact') }}" class="inline-block rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white">Get in touch</a>
    </div>
</section>
