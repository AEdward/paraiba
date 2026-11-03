<section class="bg-[#0B1F3F] text-white">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20 py-10">
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">{{ $data['heading'] ?? '' }}</h2>
        @if (! empty($data['body']))<p class="mt-3 text-lg text-slate-200">{{ $data['body'] }}</p>@endif
    </div>
</section>
