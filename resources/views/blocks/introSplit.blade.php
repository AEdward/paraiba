<section class="py-12">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20 grid lg:grid-cols-[minmax(0,0.85fr)_auto_minmax(0,1.15fr)] gap-6 lg:gap-12 items-center">
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14284B] leading-tight max-w-md">{{ $data['heading'] ?? '' }}</h2>
        <span class="hidden lg:block w-px self-stretch bg-slate-200" aria-hidden="true"></span>
        @if (! empty($data['body']))
            <p class="text-lg leading-relaxed text-slate-600">{{ $data['body'] }}</p>
        @endif
    </div>
</section>
