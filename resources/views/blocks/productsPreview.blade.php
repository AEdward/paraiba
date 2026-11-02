@php($projects = \App\Models\Project::orderBy('created_at', 'desc')->limit($data['limit'] ?? 6)->get())
<section class="py-16">
    <div class="mx-auto max-w-7xl px-6">
        <div class="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
                @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase tracking-wide text-blue-600">{{ $data['eyebrow'] }}</p>@endif
                @if (! empty($data['heading']))<h2 class="text-2xl sm:text-3xl font-bold mt-2">{{ $data['heading'] }}</h2>@endif
            </div>
            @if (! empty($data['viewAllLabel']))
                <a href="{{ route('products.index') }}" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors">
                    {{ $data['viewAllLabel'] }} <x-icon name="arrowRight" class="size-4" />
                </a>
            @endif
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach ($projects as $project)
                <a href="{{ route('products.show', $project->slug) }}" class="group rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow bg-white">
                    @if ($project->screenshotSrc())
                        <div class="aspect-video overflow-hidden bg-slate-100">
                            <img src="{{ $project->screenshotSrc() }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="{{ $project->name }}">
                        </div>
                    @endif
                    <div class="p-5">
                        <h3 class="font-semibold">{{ $project->name }}</h3>
                        <p class="text-sm text-slate-500 mt-1">{{ $project->tagline }}</p>
                    </div>
                </a>
            @endforeach
        </div>
    </div>
</section>
