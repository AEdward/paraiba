@props(['blocks', 'allowedTypes' => null])

@foreach ($blocks as $block)
    @continue($allowedTypes && ! in_array($block->type, $allowedTypes, true))
    @includeIf('blocks.'.$block->type, ['data' => $block->data])
@endforeach
