@php($jobs = \App\Models\JobPosting::where('status', \App\Enums\JobPostingStatus::Open)->orderBy('created_at', 'desc')->get())
<section class="py-16">
    <div class="mx-auto max-w-5xl px-6">
        @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase text-blue-600">{{ $data['eyebrow'] }}</p>@endif
        @if (! empty($data['heading']))<h2 class="text-2xl font-bold mt-2 mb-8">{{ $data['heading'] }}</h2>@endif
        @if ($jobs->isEmpty())
            <p class="text-slate-500">We don't have any open roles posted right now — but we're always glad to hear from people who want to build with us.</p>
        @else
            <div class="flex flex-col gap-4">
                @foreach ($jobs as $job)
                    <a href="{{ route('careers.show', $job) }}" class="rounded-xl border border-slate-200 p-5">
                        <h3 class="font-bold">{{ $job->title }}</h3>
                        <p class="text-sm text-slate-500">{{ $job->category }} · {{ $job->location }} · {{ $job->type->value }}</p>
                    </a>
                @endforeach
            </div>
        @endif
    </div>
</section>
