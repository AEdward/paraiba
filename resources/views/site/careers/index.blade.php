@extends('layouts.site')
@section('title', 'Careers — Paraiba Technology PLC')

@section('content')
<div class="mx-auto max-w-6xl px-6 py-16"
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
    <h1 class="text-3xl font-bold mb-10">Open positions</h1>

    <div class="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        <aside class="space-y-6">
            <div>
                <label class="block text-sm font-medium mb-2">Experience (years): <span x-text="experienceMax"></span></label>
                <input type="range" min="0" max="{{ config('jobs.max_experience_slider') }}" x-model.number="experienceMax" class="w-full">
                <label class="flex items-center gap-2 text-xs mt-1"><input type="checkbox" x-model="includeSenior"> Also show 10+ years roles</label>
            </div>
            <div>
                <p class="text-sm font-medium mb-2">Type</p>
                <div class="flex flex-wrap gap-2">
                    @foreach (config('jobs.types') as $type)
                        <button type="button" @click="toggleType('{{ $type }}')"
                            :class="selectedTypes.includes('{{ $type }}') ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-300'"
                            class="rounded-full px-3 py-1 text-xs">{{ $type }}</button>
                    @endforeach
                </div>
            </div>
            <div>
                <p class="text-sm font-medium mb-2">Region</p>
                <div class="flex flex-wrap gap-2">
                    <button type="button" @click="region = ''" :class="region === '' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-300'" class="rounded-full px-3 py-1 text-xs">All</button>
                    @foreach (config('jobs.regions') as $r)
                        <button type="button" @click="region = '{{ $r }}'" :class="region === '{{ $r }}' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-300'" class="rounded-full px-3 py-1 text-xs">{{ $r }}</button>
                    @endforeach
                </div>
            </div>
        </aside>

        <div>
            <div class="flex flex-wrap gap-3 mb-6">
                <input type="text" x-model="search" placeholder="Search roles..." class="rounded-lg border border-slate-300 px-3 py-2 text-sm flex-1 min-w-[200px]">
                <select x-model="title" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                    <option value="">Select Position</option>
                    <template x-for="t in titles" :key="t"><option :value="t" x-text="t"></option></template>
                </select>
                <select x-model="category" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                    <option value="">All categories</option>
                    <template x-for="c in categories" :key="c"><option :value="c" x-text="c"></option></template>
                </select>
                <select x-model="city" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                    <option value="">Select City</option>
                    <template x-for="c in cities" :key="c"><option :value="c" x-text="c"></option></template>
                </select>
            </div>

            <p class="text-sm text-slate-500 mb-4">Showing <span x-text="paged.length"></span> of <span x-text="filtered.length"></span> posts</p>

            <div class="flex flex-col gap-4">
                <template x-for="job in paged" :key="job.id">
                    <a :href="job.url" class="block rounded-xl border border-slate-200 p-5 hover:border-slate-300">
                        <h3 class="font-bold" x-text="job.title"></h3>
                        <p class="text-sm text-slate-500" x-text="job.category + ' · ' + job.location + ' · ' + job.type"></p>
                        <p class="text-sm text-slate-600 mt-2 line-clamp-2" x-text="job.description"></p>
                    </a>
                </template>
                <p x-show="filtered.length === 0" class="text-center text-slate-400 py-10">No roles match these filters right now.</p>
            </div>

            <div class="flex items-center justify-center gap-2 mt-8" x-show="totalPages > 1">
                <template x-for="n in totalPages" :key="n">
                    <button @click="page = n" :class="page === n ? 'bg-slate-900 text-white' : 'bg-white border border-slate-300'" class="h-8 w-8 rounded-full text-xs" x-text="n"></button>
                </template>
            </div>
        </div>
    </div>
</div>

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
