@php($projects = \App\Models\Project::orderBy('created_at', 'desc')->get())
<section class="py-16">
    <div class="mx-auto max-w-5xl px-6">
        @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase text-blue-600">{{ $data['eyebrow'] }}</p>@endif
        @if (! empty($data['heading']))<h2 class="text-2xl font-bold mt-2 mb-8">{{ $data['heading'] }}</h2>@endif
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            @foreach ($projects as $project)
                <a href="{{ route('products.show', $project->slug) }}" class="rounded-xl border border-slate-200 p-6">
                    <h3 class="font-bold">{{ $project->name }}</h3>
                    <p class="text-sm text-slate-500 mt-1">{{ $project->tagline }}</p>
                </a>
            @endforeach
        </div>
    </div>
</section>
