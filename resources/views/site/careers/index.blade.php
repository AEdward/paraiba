@extends('layouts.site')
@section('title', 'Careers — Paraiba Technology PLC')

@section('content')
<x-block-renderer :blocks="$introBlocks" />

<section id="open-positions" class="py-12 bg-[#F6F8FC] border-y border-slate-100"
    x-data="jobBoard({{ $jobs->map(fn ($j) => [
        'id' => $j->id,
        'title' => $j->title,
        'category' => $j->category,
        'location' => $j->location,
        'region' => $j->region,
        'type' => $j->type->value,
        'minYears' => $j->min_experience_years,
        'maxYears' => $j->max_experience_years,
        'description' => $j->description,
        'positions' => $j->positions,
        'url' => route('careers.show', $j),
    ])->toJson() }})">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20">
        <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
                <p class="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Join the team</p>
                <h2 class="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14284B]">Open positions</h2>
            </div>
            <p class="text-slate-600">Showing <span class="font-semibold text-slate-900" x-text="paged.length"></span> of <span class="font-semibold text-slate-900" x-text="filtered.length"></span> roles</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
            <aside class="rounded-xl border border-slate-200 bg-white p-6 space-y-6">
                <div>
                    <label for="job-search" class="block text-sm font-semibold text-[#14284B] mb-2">Search</label>
                    <input id="job-search" type="text" x-model="search" placeholder="Role or keyword" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                </div>
                <div>
                    <label for="job-category" class="block text-sm font-semibold text-[#14284B] mb-2">Category</label>
                    <select id="job-category" x-model="category" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm">
                        <option value="">All categories</option>
                        <template x-for="c in categories" :key="c"><option :value="c" x-text="c"></option></template>
                    </select>
                </div>
                <div>
                    <label for="job-city" class="block text-sm font-semibold text-[#14284B] mb-2">City</label>
                    <select id="job-city" x-model="city" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm">
                        <option value="">All cities</option>
                        <template x-for="c in cities" :key="c"><option :value="c" x-text="c"></option></template>
                    </select>
                </div>
                <div>
                    <p class="text-sm font-semibold text-[#14284B] mb-2">Type</p>
                    <div class="flex flex-wrap gap-2">
                        @foreach (config('jobs.types') as $type)
                            <button type="button" @click="toggleType('{{ $type }}')" :aria-pressed="selectedTypes.includes('{{ $type }}').toString()"
                                :class="selectedTypes.includes('{{ $type }}') ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'"
                                class="rounded-full border px-3 py-1 text-sm transition-colors">{{ $type }}</button>
                        @endforeach
                    </div>
                </div>
                <div>
                    <label for="job-experience" class="block text-sm font-semibold text-[#14284B] mb-2">Experience: up to <span x-text="experienceMax"></span> years</label>
                    <input id="job-experience" type="range" min="0" max="{{ config('jobs.max_experience_slider') }}" x-model.number="experienceMax" class="w-full accent-blue-600">
                    <label class="flex items-center gap-2 text-sm text-slate-600 mt-2"><input type="checkbox" x-model="includeSenior" class="accent-blue-600"> Include 10+ years roles</label>
                </div>
                <div>
                    <p class="text-sm font-semibold text-[#14284B] mb-2">Region</p>
                    <div class="flex flex-wrap gap-2">
                        <button type="button" @click="region = ''" :class="region === '' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'" class="rounded-full border px-3 py-1 text-sm transition-colors">All</button>
                        @foreach (config('jobs.regions') as $r)
                            <button type="button" @click="region = '{{ $r }}'" :class="region === '{{ $r }}' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'" class="rounded-full border px-3 py-1 text-sm transition-colors">{{ $r }}</button>
                        @endforeach
                    </div>
                </div>
            </aside>

            <div>
                <ul class="flex flex-col gap-4">
                    <template x-for="job in paged" :key="job.id">
                        <li>
                            <a :href="job.url" class="group flex items-start gap-5 rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md">
                                <span class="hidden sm:inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <x-icon name="briefcase" :stroke="1.7" class="size-6" />
                                </span>
                                <div class="min-w-0 flex-1">
                                    <h3 class="text-lg font-bold text-[#14284B] group-hover:text-blue-600" x-text="job.title"></h3>
                                    <div class="mt-2 flex flex-wrap gap-2 text-sm">
                                        <span class="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700" x-text="job.category"></span>
                                        <span class="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700" x-text="job.location"></span>
                                        <span class="rounded-md bg-blue-50 px-2 py-0.5 text-blue-700" x-text="job.type"></span>
                                    </div>
                                    <p class="mt-3 text-[15px] text-slate-600 line-clamp-2" x-text="job.description"></p>
                                </div>
                                <x-icon name="arrowRight" class="mt-1 size-5 shrink-0 text-blue-600 transition-transform group-hover:translate-x-1" />
                            </a>
                        </li>
                    </template>
                </ul>
                <div x-show="filtered.length === 0" class="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                    <x-icon name="briefcase" :stroke="1.4" class="mx-auto size-12 text-slate-400" />
                    <p class="mt-3 text-lg font-semibold text-[#14284B]" x-text="jobs.length ? 'No roles match these filters' : 'No open roles right now'"></p>
                    <p class="text-slate-600">We're always glad to hear from people who want to build with us.</p>
                </div>

                <nav class="flex items-center justify-center gap-2 mt-8" x-show="totalPages > 1" aria-label="Pagination">
                    <template x-for="n in totalPages" :key="n">
                        <button type="button" @click="page = n" :aria-current="page === n ? 'page' : null" :class="page === n ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-300 text-slate-700 hover:border-blue-400'" class="size-9 rounded-full border text-sm font-semibold" x-text="n"></button>
                    </template>
                </nav>
            </div>
        </div>
    </div>
</section>

<x-block-renderer :blocks="$outroBlocks" />

@push('head')
<script>
function jobBoard(jobs) {
    return {
        jobs,
        search: '', title: '', category: '', city: '', region: '',
        selectedTypes: [], experienceMax: {{ config('jobs.max_experience_slider') }}, includeSenior: false,
        page: 1, pageSize: {{ config('jobs.page_size') }},

        toggleType(t) {
            this.selectedTypes = this.selectedTypes.includes(t)
                ? this.selectedTypes.filter(x => x !== t)
                : [...this.selectedTypes, t];
        },

        get titles() { return [...new Set(this.jobs.map(j => j.title))]; },
        get categories() { return [...new Set(this.jobs.map(j => j.category))]; },
        get cities() { return [...new Set(this.jobs.map(j => j.location))]; },

        get filtered() {
            return this.jobs.filter(j => {
                if (this.search && !(j.title.toLowerCase().includes(this.search.toLowerCase()) || j.description.toLowerCase().includes(this.search.toLowerCase()))) return false;
                if (this.title && j.title !== this.title) return false;
                if (this.category && j.category !== this.category) return false;
                if (this.city && j.location !== this.city) return false;
                if (this.region && j.region !== this.region) return false;
                if (this.selectedTypes.length && !this.selectedTypes.includes(j.type)) return false;
                const expOk = j.minYears <= this.experienceMax || (this.includeSenior && j.maxYears > 10);
                if (!expOk) return false;
                return true;
            });
        },

        get totalPages() { return Math.max(1, Math.ceil(this.filtered.length / this.pageSize)); },
        get paged() {
            const start = (this.page - 1) * this.pageSize;
            return this.filtered.slice(start, start + this.pageSize);
        },
    };
}
</script>
@endpush
@endsection
