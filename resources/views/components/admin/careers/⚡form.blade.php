<?php

use App\Enums\JobLevel;
use App\Enums\JobPostingStatus;
use App\Enums\JobType;
use App\Enums\WorkMode;
use App\Models\JobPosting;
use Illuminate\Validation\Rule;
use Livewire\Component;

new class extends Component
{
    public ?JobPosting $posting = null;

    public string $title = '';
    public string $category = 'Engineering';
    public string $level = 'Mid';
    public string $location = '';
    public string $type = 'Full-time';
    public string $work_mode = 'On-site';
    public string $description = '';
    public string $about_role = '';
    public string $responsibilities = '';
    public string $nice_to_have = '';
    public string $how_to_apply = '';
    public string $tech_stack = '';
    public string $region = '';
    public int $positions = 1;
    public int $min_experience_years = 0;
    public int $max_experience_years = 3;
    public string $expires_at = '';
    public string $status = 'open';

    public function mount(?JobPosting $posting = null): void
    {
        $this->posting = $posting?->exists ? $posting : null;

        if ($this->posting) {
            $this->title = $this->posting->title;
            $this->category = $this->posting->category;
            $this->level = $this->posting->level->value;
            $this->location = $this->posting->location;
            $this->type = $this->posting->type->value;
            $this->work_mode = $this->posting->work_mode->value;
            $this->description = $this->posting->description;
            $this->about_role = (string) $this->posting->about_role;
            $this->responsibilities = (string) $this->posting->responsibilities;
            $this->nice_to_have = (string) $this->posting->nice_to_have;
            $this->how_to_apply = (string) $this->posting->how_to_apply;
            $this->tech_stack = (string) $this->posting->tech_stack;
            $this->region = (string) $this->posting->region;
            $this->positions = $this->posting->positions;
            $this->min_experience_years = $this->posting->min_experience_years;
            $this->max_experience_years = $this->posting->max_experience_years;
            $this->expires_at = $this->posting->expires_at?->format('Y-m-d') ?? '';
            $this->status = $this->posting->status->value;
        }
    }

    public function save(): void
    {
        $data = $this->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'level' => ['required', Rule::enum(JobLevel::class)],
            'location' => ['required', 'string', 'max:255'],
            'type' => ['required', Rule::enum(JobType::class)],
            'work_mode' => ['required', Rule::enum(WorkMode::class)],
            'description' => ['required', 'string'],
            'about_role' => ['nullable', 'string'],
            'responsibilities' => ['nullable', 'string'],
            'nice_to_have' => ['nullable', 'string'],
            'how_to_apply' => ['nullable', 'string'],
            'tech_stack' => ['nullable', 'string'],
            'region' => ['nullable', 'string'],
            'positions' => ['required', 'integer', 'min:1'],
            'min_experience_years' => ['required', 'integer', 'min:0'],
            'max_experience_years' => ['required', 'integer', 'min:0'],
            'expires_at' => ['nullable', 'date'],
            'status' => ['required', Rule::enum(JobPostingStatus::class)],
        ]);

        $data['expires_at'] = $data['expires_at'] ?: null;

        if ($this->posting) {
            $this->posting->update($data);
        } else {
            JobPosting::create($data);
        }

        session()->flash('status', 'Posting saved.');
        $this->redirectRoute('admin.careers.index');
    }
};
?>

<div class="mx-auto max-w-3xl px-6 py-10">
    <h1 class="text-xl font-bold mb-6">{{ $posting ? 'Edit' : 'New' }} job posting</h1>
    <form wire:submit="save" class="space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-1">Title</label>
                <input type="text" wire:model="title" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                @error('title') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Category</label>
                <input type="text" wire:model="category" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
                <label class="block text-sm font-medium mb-1">Level</label>
                <select wire:model="level" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                    @foreach (App\Enums\JobLevel::cases() as $case)<option value="{{ $case->value }}">{{ $case->value }}</option>@endforeach
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Type</label>
                <select wire:model="type" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                    @foreach (App\Enums\JobType::cases() as $case)<option value="{{ $case->value }}">{{ $case->value }}</option>@endforeach
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Work mode</label>
                <select wire:model="work_mode" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                    @foreach (App\Enums\WorkMode::cases() as $case)<option value="{{ $case->value }}">{{ $case->value }}</option>@endforeach
                </select>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-1">Location</label>
                <input type="text" wire:model="location" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                @error('location') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Region</label>
                <input type="text" wire:model="region" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            </div>
        </div>

        <div>
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea wire:model="description" rows="3" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></textarea>
            @error('description') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <label class="block text-sm font-medium mb-1">About the role</label>
            <textarea wire:model="about_role" rows="3" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-1">Responsibilities (one per line)</label>
                <textarea wire:model="responsibilities" rows="4" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Nice to have (one per line)</label>
                <textarea wire:model="nice_to_have" rows="4" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></textarea>
            </div>
        </div>

        <div>
            <label class="block text-sm font-medium mb-1">Tech stack (comma separated)</label>
            <input type="text" wire:model="tech_stack" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
        </div>

        <div>
            <label class="block text-sm font-medium mb-1">How to apply</label>
            <textarea wire:model="how_to_apply" rows="2" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
                <label class="block text-sm font-medium mb-1">Positions</label>
                <input type="number" wire:model="positions" min="1" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Min years</label>
                <input type="number" wire:model="min_experience_years" min="0" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Max years</label>
                <input type="number" wire:model="max_experience_years" min="0" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-1">Expires</label>
                <input type="date" wire:model="expires_at" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Status</label>
                <select wire:model="status" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                    @foreach (App\Enums\JobPostingStatus::cases() as $case)<option value="{{ $case->value }}">{{ $case->value }}</option>@endforeach
                </select>
            </div>
        </div>

        <div class="flex items-center gap-3 pt-2">
            <button type="submit" wire:loading.attr="disabled" wire:target="save" class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"><span wire:loading.remove wire:target="save">Save</span><span wire:loading wire:target="save">Saving…</span></button>
            <a href="{{ route('admin.careers.index') }}" class="text-sm text-slate-500">Cancel</a>
        </div>
    </form>
</div>
