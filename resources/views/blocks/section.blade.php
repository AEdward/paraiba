<section class="py-12">
    <div class="mx-auto max-w-3xl px-6">
        @foreach ($data['elements'] ?? [] as $element)
            <x-section-element :element="$element" />
        @endforeach
    </div>
</section>
