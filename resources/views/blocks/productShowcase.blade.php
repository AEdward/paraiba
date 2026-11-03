@php
    $uid = 'showcase-' . substr(md5(serialize($data)), 0, 6);
@endphp

<section class="relative bg-white" style="height: 400vh;">
    <div id="{{ $uid }}-pin" class="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-white via-blue-50/50 to-white">
        <div class="mx-auto max-w-7xl h-full px-6 grid lg:grid-cols-2 gap-10 items-center">
            <div>
                @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase tracking-wide text-blue-600">{{ $data['eyebrow'] }}</p>@endif
                <h1 class="text-4xl sm:text-5xl font-bold mt-3 leading-tight text-slate-900">
                    {{ $data['headline'] ?? '' }}
                    @if (! empty($data['headlineHighlight']))<span class="text-blue-600">{{ $data['headlineHighlight'] }}</span>@endif
                </h1>
                @if (! empty($data['subhead']))<p class="text-lg text-slate-600 mt-5 max-w-xl">{{ $data['subhead'] }}</p>@endif
                <div class="flex flex-wrap gap-3 mt-8">
                    @if (! empty($data['primaryLabel']))
                        <a href="{{ $data['primaryHref'] ?? '#' }}" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-6 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors">
                            {{ $data['primaryLabel'] }} <x-icon name="arrowRight" class="size-4" />
                        </a>
                    @endif
                    @if (! empty($data['secondaryLabel']))
                        <a href="{{ $data['secondaryHref'] ?? '#' }}" class="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold hover:bg-slate-50 transition-colors">
                            {{ $data['secondaryLabel'] }}
                        </a>
                    @endif
                </div>

                <div class="flex gap-8 mt-12">
                    <span id="{{ $uid }}-laptop-label" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <span class="size-2 rounded-full bg-blue-600"></span> {{ $data['laptopLabel'] ?? 'Zemen Homes' }}
                    </span>
                    <span id="{{ $uid }}-phone-label" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <span class="size-2 rounded-full bg-slate-900"></span> {{ $data['phoneLabel'] ?? 'NileDating' }}
                    </span>
                </div>
            </div>

            <div class="relative flex items-center justify-center" style="perspective: 2000px;">
                <div id="{{ $uid }}-stage" class="relative">
                    <div id="{{ $uid }}-laptop-rig" style="transform-style: preserve-3d;">
                        <div id="{{ $uid }}-laptop-lid" class="device-lid" style="background-image: url('{{ $data['laptopImage'] ?? '/images/showcase/zemenhomes.png' }}')"></div>
                        <div class="device-laptop-base"></div>
                    </div>

                    <div id="{{ $uid }}-phone-rig" class="device-phone-rig">
                        <div class="device-phone-screen" style="background-image: url('{{ $data['phoneImage'] ?? '/images/showcase/niledating.png' }}')"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

@once
    <style>
        .device-lid {
            width: min(44vw, 560px);
            aspect-ratio: 1357 / 645;
            background-color: #f8fafc;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            border-radius: 14px;
            border: 10px solid #0f172a;
            box-shadow: 0 30px 60px -20px rgba(15, 23, 42, 0.35);
            transform-origin: bottom center;
        }
        .device-laptop-base {
            width: calc(min(44vw, 560px) * 1.08);
            height: 16px;
            margin: 0 auto;
            background: linear-gradient(to bottom, #1e293b, #0f172a);
            border-radius: 0 0 10px 10px;
        }
        .device-phone-rig {
            position: absolute;
            right: -8%;
            bottom: -8%;
        }
        .device-phone-screen {
            width: min(16vw, 150px);
            aspect-ratio: 853 / 1844;
            background-color: #f8fafc;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            border-radius: 22px;
            border: 8px solid #0f172a;
            box-shadow: 0 25px 50px -15px rgba(15, 23, 42, 0.4);
        }
        @media (max-width: 1024px) {
            .device-phone-rig { right: -4%; bottom: -10%; }
        }
    </style>
@endonce

@push('scripts')
    @once
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
    @endonce
    <script>
        (function () {
            function init() {
                gsap.registerPlugin(ScrollTrigger);

                gsap.set('#{{ $uid }}-laptop-lid', { rotateX: 100 });
                gsap.set('#{{ $uid }}-laptop-rig', { rotateY: 55 });
                gsap.set('#{{ $uid }}-phone-rig', { opacity: 0, x: 120, scale: 0.9 });
                gsap.set(['#{{ $uid }}-laptop-label', '#{{ $uid }}-phone-label'], { opacity: 0, y: 10 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '#{{ $uid }}-pin',
                        start: 'top top',
                        end: '+=300%',
                        scrub: 1,
                        pin: true,
                    },
                });

                tl.to('#{{ $uid }}-laptop-lid', { rotateX: 0, duration: 0.25, ease: 'power2.out' }, 0)
                  .to('#{{ $uid }}-laptop-rig', { rotateY: 0, duration: 0.25, ease: 'power2.inOut' }, 0.25)
                  .to('#{{ $uid }}-phone-rig', { opacity: 1, x: 0, scale: 1, duration: 0.25, ease: 'power2.out' }, 0.5)
                  .to(['#{{ $uid }}-laptop-label', '#{{ $uid }}-phone-label'], { opacity: 1, y: 0, duration: 0.2 }, 0.78);
            }

            if (window.gsap && window.ScrollTrigger) {
                init();
            } else {
                window.addEventListener('load', init);
            }
        })();
    </script>
@endpush
