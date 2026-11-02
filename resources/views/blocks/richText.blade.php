<section class="py-16">
    <div class="mx-auto max-w-5xl px-6 grid {{ ! empty($data['imageUrl']) ? 'grid-cols-2 gap-10 items-center' : '' }}">
        <div class="prose max-w-none {{ ($data['imagePosition'] ?? 'right') === 'left' ? 'order-2' : '' }}">
            {{-- Content only ever comes from authenticated admins (not public input), so raw output is safe here. --}}
            {!! $data['body'] ?? '' !!}
        </div>
        @if (! empty($data['imageUrl']))
            <div>
                <img src="{{ $data['imageUrl'] }}" class="rounded-xl w-full object-{{ $data['imageFit'] ?? 'cover' }}">
                @if (! empty($data['caption']))<p class="text-xs text-slate-400 mt-2">{{ $data['caption'] }}</p>@endif
            </div>
        @endif
    </div>
</section>
