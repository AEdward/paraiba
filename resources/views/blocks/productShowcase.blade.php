@php
    $uid = 'showcase-' . substr(md5(serialize($data)), 0, 6);
    $laptopImage = $data['laptopImage'] ?? '/images/showcase/zemenhomes.png';
    $phoneImage = $data['phoneImage'] ?? '/images/showcase/niledating.png';
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
                    <span id="{{ $uid }}-laptop-label" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-900" style="opacity:0">
                        <span class="size-2 rounded-full bg-blue-600"></span> {{ $data['laptopLabel'] ?? 'Zemen Homes' }}
                    </span>
                    <span id="{{ $uid }}-phone-label" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-900" style="opacity:0">
                        <span class="size-2 rounded-full bg-slate-900"></span> {{ $data['phoneLabel'] ?? 'NileDating' }}
                    </span>
                </div>
            </div>

            <div class="relative h-full">
                <canvas id="{{ $uid }}-canvas" class="w-full h-full block"></canvas>
            </div>
        </div>
    </div>
</section>

@push('scripts')
    @once
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
    @endonce
    <script>
        (function () {
            function init() {
                gsap.registerPlugin(ScrollTrigger);

                const canvas = document.getElementById('{{ $uid }}-canvas');
                const container = canvas.parentElement;
                const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
                camera.position.set(0, 1.1, 5.2);
                camera.lookAt(0, 0.55, 0);

                scene.add(new THREE.AmbientLight(0xffffff, 0.75));
                const key = new THREE.DirectionalLight(0xffffff, 0.9);
                key.position.set(2, 4, 3);
                scene.add(key);
                const fill = new THREE.DirectionalLight(0xbfdcff, 0.4);
                fill.position.set(-3, 1, -2);
                scene.add(fill);

                function resize() {
                    const w = container.clientWidth;
                    const h = container.clientHeight;
                    renderer.setSize(w, h, false);
                    camera.aspect = w / h;
                    camera.updateProjectionMatrix();
                }
                window.addEventListener('resize', resize);

                const loader = new THREE.TextureLoader();
                const bezelMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6, metalness: 0.2 });
                const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6, metalness: 0.2 });

                // --- Laptop ---
                const laptopGroup = new THREE.Group();
                laptopGroup.position.x = -0.9;

                const base = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.1, 1.7), baseMat);
                base.position.y = -0.05;
                laptopGroup.add(base);

                const hinge = new THREE.Group();
                hinge.position.set(0, 0.0, -0.8);
                laptopGroup.add(hinge);

                const lidHeight = 1.4;
                const lidWidth = 2.5;
                const bezel = new THREE.Mesh(new THREE.PlaneGeometry(lidWidth, lidHeight), bezelMat);
                bezel.position.set(0, lidHeight / 2, 0);
                hinge.add(bezel);

                const laptopRatio = 1357 / 645;
                const screenHeight = lidHeight - 0.18;
                const screenWidth = Math.min(lidWidth - 0.18, screenHeight * laptopRatio);
                const screenMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
                const laptopScreen = new THREE.Mesh(new THREE.PlaneGeometry(screenWidth, screenHeight), screenMat);
                laptopScreen.position.set(0, lidHeight / 2, 0.01);
                hinge.add(laptopScreen);

                loader.load('{{ $laptopImage }}', function (tex) {
                    tex.colorSpace = THREE.SRGBColorSpace;
                    screenMat.map = tex;
                    screenMat.needsUpdate = true;
                });

                scene.add(laptopGroup);

                // --- Phone ---
                const phoneGroup = new THREE.Group();
                phoneGroup.position.set(1.7, 0.55, 0.3);

                const phoneW = 0.8;
                const phoneRatio = 853 / 1844;
                const phoneH = phoneW / phoneRatio;
                const phoneBezel = new THREE.Mesh(new THREE.PlaneGeometry(phoneW + 0.12, phoneH + 0.12), bezelMat.clone());
                phoneGroup.add(phoneBezel);

                const phoneScreenMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1 });
                const phoneScreen = new THREE.Mesh(new THREE.PlaneGeometry(phoneW, phoneH), phoneScreenMat);
                phoneScreen.position.z = 0.01;
                phoneGroup.add(phoneScreen);

                loader.load('{{ $phoneImage }}', function (tex) {
                    tex.colorSpace = THREE.SRGBColorSpace;
                    phoneScreenMat.map = tex;
                    phoneScreenMat.needsUpdate = true;
                });

                phoneBezel.material.transparent = true;
                phoneBezel.material.opacity = 1;
                scene.add(phoneGroup);

                // --- Initial / closed state ---
                hinge.rotation.x = Math.PI / 2 * 0.98; // closed: lid folded flat onto the base
                laptopGroup.rotation.y = -0.9; // angled away from viewer
                phoneGroup.position.x = 3.4;
                phoneScreenMat.opacity = 0;
                phoneBezel.material.opacity = 0;

                resize();

                function render() {
                    renderer.render(scene, camera);
                    requestAnimationFrame(render);
                }
                render();

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '#{{ $uid }}-pin',
                        start: 'top top',
                        end: '+=300%',
                        scrub: 1,
                        pin: true,
                        onRefresh: resize,
                    },
                });

                tl.to(hinge.rotation, { x: 0, duration: 0.25, ease: 'power2.out' }, 0)
                  .to(laptopGroup.rotation, { y: 0, duration: 0.25, ease: 'power2.inOut' }, 0.25)
                  .to(phoneGroup.position, { x: 1.7, duration: 0.25, ease: 'power2.out' }, 0.5)
                  .to(phoneScreenMat, { opacity: 1, duration: 0.25 }, 0.5)
                  .to(phoneBezel.material, { opacity: 1, duration: 0.25 }, 0.5)
                  .to('#{{ $uid }}-laptop-label', { opacity: 1, duration: 0.2 }, 0.78)
                  .to('#{{ $uid }}-phone-label', { opacity: 1, duration: 0.2 }, 0.78);
            }

            if (window.THREE && window.gsap && window.ScrollTrigger) {
                init();
            } else {
                window.addEventListener('load', init);
            }
        })();
    </script>
@endpush
