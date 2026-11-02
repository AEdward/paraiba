@props(['element'])

@php($type = $element['type'] ?? null)

@switch($type)
    @case('heading')
        @php($level = $element['level'] ?? 2)
        <{{ 'h'.min(max((int) $level, 1), 6) }} class="font-bold text-2xl mt-6 mb-3">{{ $element['text'] ?? '' }}</{{ 'h'.min(max((int) $level, 1), 6) }}>
        @break

    @case('paragraph')
        <p class="text-slate-700 my-3">{{ $element['text'] ?? '' }}</p>
        @break

    @case('list')
        @if (($element['ordered'] ?? false))
            <ol class="list-decimal list-inside my-3 space-y-1">
                @foreach ($element['items'] ?? [] as $item)<li>{{ $item }}</li>@endforeach
            </ol>
        @else
            <ul class="list-disc list-inside my-3 space-y-1">
                @foreach ($element['items'] ?? [] as $item)<li>{{ $item }}</li>@endforeach
            </ul>
        @endif
        @break

    @case('quote')
        <blockquote class="border-l-4 border-slate-300 pl-4 italic my-4">{{ $element['text'] ?? '' }}</blockquote>
        @break

    @case('pullquote')
        <p class="text-center text-2xl font-semibold my-8">{{ $element['text'] ?? '' }}</p>
        @break

    @case('code')
        <pre class="bg-slate-900 text-slate-100 rounded-lg p-4 my-4 overflow-x-auto text-sm"><code>{{ $element['code'] ?? '' }}</code></pre>
        @break

    @case('preformatted')
        <pre class="bg-slate-50 rounded-lg p-4 my-4 overflow-x-auto text-sm whitespace-pre-wrap">{{ $element['text'] ?? '' }}</pre>
        @break

    @case('details')
        <details class="my-4 rounded-lg border border-slate-200 p-4">
            <summary class="font-semibold cursor-pointer">{{ $element['summary'] ?? '' }}</summary>
            <div class="mt-2 text-slate-600">{{ $element['text'] ?? '' }}</div>
        </details>
        @break

    @case('table')
        <table class="w-full my-4 text-sm border border-slate-200">
            @foreach ($element['rows'] ?? [] as $row)
                <tr class="border-b border-slate-100">
                    @foreach ($row as $cell)<td class="px-3 py-2">{{ $cell }}</td>@endforeach
                </tr>
            @endforeach
        </table>
        @break

    @case('image')
        <figure class="my-4">
            <img src="{{ $element['url'] ?? '' }}" alt="{{ $element['alt'] ?? '' }}" class="rounded-xl w-full">
            @if (! empty($element['caption']))<figcaption class="text-xs text-slate-400 mt-2">{{ $element['caption'] }}</figcaption>@endif
        </figure>
        @break

    @case('gallery')
        <div class="grid grid-cols-3 gap-3 my-4">
            @foreach ($element['images'] ?? [] as $img)
                <img src="{{ is_array($img) ? ($img['url'] ?? '') : $img }}" class="rounded-lg w-full aspect-square object-cover">
            @endforeach
        </div>
        @break

    @case('video')
        <video controls class="w-full rounded-xl my-4" src="{{ $element['url'] ?? '' }}"></video>
        @break

    @case('audio')
        <audio controls class="w-full my-4" src="{{ $element['url'] ?? '' }}"></audio>
        @break

    @case('file')
        <a href="{{ $element['url'] ?? '#' }}" class="inline-block my-3 rounded-lg border border-slate-300 px-4 py-2 text-sm">{{ $element['label'] ?? 'Download file' }}</a>
        @break

    @case('cover')
        <div class="relative rounded-xl overflow-hidden my-6 py-16 px-8 text-center text-white bg-cover bg-center" style="background-image: url('{{ $element['url'] ?? '' }}')">
            <div class="absolute inset-0 bg-black/40"></div>
            <h2 class="relative text-2xl font-bold">{{ $element['heading'] ?? '' }}</h2>
        </div>
        @break

    @case('mediaText')
        <div class="grid grid-cols-2 gap-8 items-center my-6">
            <img src="{{ $element['url'] ?? '' }}" class="rounded-xl w-full">
            <div>{{ $element['text'] ?? '' }}</div>
        </div>
        @break

    @case('icon')
        <span class="inline-block my-2 text-3xl">{{ $element['key'] ?? '' }}</span>
        @break

    @case('buttons')
        <div class="flex gap-3 my-4">
            @foreach ($element['items'] ?? [] as $btn)
                <a href="{{ $btn['href'] ?? '#' }}" class="rounded-lg bg-slate-900 text-white px-5 py-2.5 text-sm font-semibold">{{ $btn['label'] ?? '' }}</a>
            @endforeach
        </div>
        @break

    @case('columns')
        <div class="grid gap-6 my-6" style="grid-template-columns: repeat({{ count($element['columns'] ?? []) ?: 1 }}, minmax(0, 1fr))">
            @foreach ($element['columns'] ?? [] as $column)
                <div>
                    @foreach ($column as $nested)
                        <x-section-element :element="$nested" />
                    @endforeach
                </div>
            @endforeach
        </div>
        @break

    @case('separator')
        <hr class="my-8 border-slate-200">
        @break

    @case('spacer')
        <div style="height: {{ $element['height'] ?? 40 }}px"></div>
        @break

    @case('embed')
        <div class="my-4 aspect-video">
            <iframe src="{{ $element['url'] ?? '' }}" class="w-full h-full rounded-xl" allowfullscreen></iframe>
        </div>
        @break
@endswitch
