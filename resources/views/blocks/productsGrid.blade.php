@php($projects = \App\Models\Project::orderBy('created_at', 'desc')->get())
<section class="py-16">
    <div class="mx-auto max-w-7xl px-6">
        @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase tracking-wide text-blue-600">{{ $data['eyebrow'] }}</p>@endif
        @if (! empty($data['heading']))<h2 class="text-2xl sm:text-3xl font-bold mt-2 mb-10">{{ $data['heading'] }}</h2>@endif
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach ($projects as $project)
                <a href="{{ route('products.show', $project->slug) }}" class="group rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow bg-white">
                    @if ($project->screenshotSrc())
                        <div class="aspect-video overflow-hidden bg-slate-100">
                            <img src="{{ $project->screenshotSrc() }}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="{{ $project->name }}">
                        </div>
                    @endif
                    <div class="p-5">
                        <div class="flex items-center justify-between gap-3">
                            <h3 class="font-semibold">{{ $project->name }}</h3>
                            <span class="shrink-0 text-xs font-medium rounded-full bg-blue-50 text-blue-600 px-2.5 py-0.5">{{ ucfirst($project->status->value) }}</span>
                        </div>
                        <p class="text-sm text-slate-500 mt-1">{{ $project->tagline }}</p>
                    </div>
                </a>
            @endforeach
        </div>
    </div>
</section>
