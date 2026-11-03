@php($dark = ($data['theme'] ?? 'light') === 'dark')
<section class="{{ $dark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900' }} overflow-hidden">
    <div class="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div class="{{ ($data['align'] ?? 'left') === 'center' ? 'text-center mx-auto' : '' }}">
            @if (! empty($data['eyebrow']))
                <p class="text-sm font-semibold uppercase tracking-wide text-blue-600">{{ $data['eyebrow'] }}</p>
            @endif
            <h1 class="text-4xl sm:text-5xl font-bold mt-3 leading-tight">
                {{ $data['headline'] ?? '' }}
                @if (! empty($data['headlineHighlight']))<span class="text-blue-600">{{ $data['headlineHighlight'] }}</span>@endif
                @if (! empty($data['headline2']))<br>{{ $data['headline2'] }}@endif
            </h1>
            @if (! empty($data['subhead']))
                <p class="text-lg {{ $dark ? 'text-slate-300' : 'text-slate-600' }} mt-5 max-w-xl">{{ $data['subhead'] }}</p>
            @endif
            <div class="flex flex-wrap gap-3 mt-8 {{ ($data['align'] ?? 'left') === 'center' ? 'justify-center' : '' }}">
                @if (! empty($data['primaryLabel']))
                    <a href="{{ $data['primaryHref'] ?? '#' }}" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-6 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors">
                        {{ $data['primaryLabel'] }}
                    </a>
                @endif
                @if (! empty($data['secondaryLabel']))
                    <a href="{{ $data['secondaryHref'] ?? '#' }}" class="rounded-lg border {{ $dark ? 'border-white/30' : 'border-slate-300' }} px-6 py-3 text-sm font-semibold hover:bg-slate-50 {{ $dark ? 'hover:bg-white/5' : '' }} transition-colors">
                        {{ $data['secondaryLabel'] }}
                    </a>
                @endif
            </div>
        </div>

        @if (! empty($data['mockupImage']) || ! empty($data['phoneImage']))
            <div class="relative flex items-center justify-center py-10">
                <div class="absolute inset-0 flex items-center justify-center -z-10">
                    <div class="size-[26rem] rounded-full bg-blue-100/60 blur-2xl"></div>
                </div>

                @if (! empty($data['mockupImage']))
                    <div class="hero-laptop">
                        <div class="hero-laptop-screen" style="background-image: url('{{ $data['mockupImage'] }}')"></div>
                        <div class="hero-laptop-base"></div>
                    </div>
                @endif

                @if (! empty($data['phoneImage']))
                    <div class="hero-phone" style="background-image: url('{{ $data['phoneImage'] }}')"></div>
                @endif
            </div>
        @endif
    </div>
</section>

@once
    <style>
        .hero-laptop { width: min(34vw, 420px); }
        .hero-laptop-screen {
            width: 100%;
            aspect-ratio: 1357 / 645;
            background-color: #f8fafc;
            background-size: cover;
            background-position: top center;
            border-radius: 12px 12px 4px 4px;
            border: 8px solid #1e293b;
            box-shadow: 0 30px 60px -20px rgba(15, 23, 42, 0.35);
        }
        .hero-laptop-base {
            width: 108%;
            margin-left: -4%;
            height: 12px;
            background: linear-gradient(to bottom, #cbd5e1, #94a3b8);
            border-radius: 0 0 8px 8px;
        }
        .hero-phone {
            position: absolute;
            left: -4%;
            bottom: -6%;
            width: min(13vw, 160px);
            aspect-ratio: 853 / 1844;
            background-color: #f8fafc;
            background-size: cover;
            background-position: top center;
            border-radius: 20px;
            border: 7px solid #1e293b;
            box-shadow: 0 25px 50px -15px rgba(15, 23, 42, 0.4);
        }
        @media (max-width: 1024px) {
            .hero-phone { left: -2%; bottom: -10%; }
        }
    </style>
@endonce
