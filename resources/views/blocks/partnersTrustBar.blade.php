@php($partners = \App\Models\Partner::orderBy('order')->get())
@if ($partners->isNotEmpty())
<section class="py-12 border-y border-slate-200">
    <div class="mx-auto max-w-5xl px-6">
        @if (! empty($data['heading']))<p class="text-center text-sm text-slate-400 mb-6">{{ $data['heading'] }}</p>@endif
        <div class="flex flex-wrap items-center justify-center gap-10 opacity-70">
            @foreach ($partners as $partner)
                @if ($partner->logoSrc())<img src="{{ $partner->logoSrc() }}" alt="{{ $partner->name }}" class="h-8">@else<span>{{ $partner->name }}</span>@endif
            @endforeach
        </div>
    </div>
</section>
@endif
