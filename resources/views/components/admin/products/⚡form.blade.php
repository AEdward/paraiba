<?php

use App\Enums\ProjectStatus;
use App\Models\Project;
use App\Support\HandlesUploads;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Livewire\Component;
use Livewire\WithFileUploads;

new class extends Component
{
    use HandlesUploads, WithFileUploads;

    public ?Project $project = null;

    public string $slug = '';
    public string $name = '';
    public string $tagline = '';
    public string $description = '';
    public string $status = 'concept';
    public string $tags = '';
    public string $link = '';
    public string $screenshot_url = '';
    public ?UploadedFile $screenshot_upload = null;
    public bool $remove_screenshot = false;
    public bool $embed_live = false;
    public string $github_repo = '';
    public bool $featured = false;
    public string $deliverables = '';
    public string $case_study = '';

    public function mount(?Project $project = null): void
    {
        $this->project = $project?->exists ? $project : null;

        if ($this->project) {
            $this->slug = $this->project->slug;
            $this->name = $this->project->name;
            $this->tagline = $this->project->tagline;
            $this->description = $this->project->description;
            $this->tags = $this->project->tags;
            $this->link = (string) $this->project->link;
            $this->screenshot_url = (string) $this->project->screenshot_url;
            $this->embed_live = $this->project->embed_live;
            $this->github_repo = (string) $this->project->github_repo;
            $this->featured = $this->project->featured;
            $this->deliverables = (string) $this->project->deliverables;
            $this->case_study = (string) $this->project->case_study;
            $this->status = $this->project->status->value;
        }
    }

    public function save(): void
    {
        $data = $this->validate([
            'slug' => ['required', 'string', 'alpha_dash', 'max:255', 'unique:projects,slug,'.($this->project?->id ?? 'NULL').',id'],
            'name' => ['required', 'string', 'max:255'],
            'tagline' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'status' => ['required', Rule::enum(ProjectStatus::class)],
            'tags' => ['nullable', 'string'],
            'link' => ['nullable', 'url'],
            'screenshot_url' => ['nullable', 'url'],
            'screenshot_upload' => ['nullable', 'image', 'max:4096'],
            'embed_live' => ['boolean'],
            'github_repo' => ['nullable', 'regex:/^[\w.-]+\/[\w.-]+$/'],
            'featured' => ['boolean'],
            'deliverables' => ['nullable', 'string'],
            'case_study' => ['nullable', 'string'],
        ]);

        unset($data['screenshot_upload']);

        if ($this->screenshot_upload) {
            $stored = $this->storeUpload($this->screenshot_upload, 'screenshots');
            $data = array_merge($data, [
                'screenshot_disk' => $stored['disk'],
                'screenshot_path' => $stored['path'],
                'screenshot_mime_type' => $stored['mime_type'],
            ]);
        } elseif ($this->remove_screenshot) {
            $data = array_merge($data, ['screenshot_disk' => null, 'screenshot_path' => null, 'screenshot_mime_type' => null]);
        }

        if ($this->project) {
            $this->project->update($data);
        } else {
            Project::create($data);
        }

        session()->flash('status', 'Product saved.');
        $this->redirectRoute('admin.products.index');
    }

    public function slugify(): void
    {
        if (! $this->project) {
            $this->slug = Str::slug($this->name);
        }
    }
};
?>

<div class="mx-auto max-w-3xl px-6 py-10">
    <h1 class="text-xl font-bold mb-6">{{ $project ? 'Edit' : 'New' }} product</h1>

    <form wire:submit="save" class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-1">Name</label>
                <input type="text" wire:model.blur="name" wire:change="slugify" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                @error('name') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Slug</label>
                <input type="text" wire:model="slug" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                @error('slug') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>
        </div>

        <div>
            <label class="block text-sm font-medium mb-1">Tagline</label>
            <input type="text" wire:model="tagline" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            @error('tagline') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea wire:model="description" rows="3" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></textarea>
            @error('description') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-1">Status</label>
                <select wire:model="status" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                    @foreach (App\Enums\ProjectStatus::cases() as $case)
                        <option value="{{ $case->value }}">{{ $case->value }}</option>
                    @endforeach
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Tags (comma separated)</label>
                <input type="text" wire:model="tags" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-1">Link</label>
                <input type="url" wire:model="link" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">GitHub repo (owner/repo)</label>
                <input type="text" wire:model="github_repo" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                @error('github_repo') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>
        </div>

        <div>
            <label class="block text-sm font-medium mb-1">Screenshot</label>
            @if ($project?->screenshot_path && ! $remove_screenshot)
                <div class="mb-2 flex items-center gap-3">
                    <img src="{{ $project->screenshotSrc() }}" class="h-16 rounded border border-slate-200">
                    <label class="text-xs text-red-600"><input type="checkbox" wire:model="remove_screenshot"> Remove</label>
                </div>
            @endif
            <input type="file" wire:model="screenshot_upload" accept="image/*" class="w-full text-sm">
            @error('screenshot_upload') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
            <div wire:loading wire:target="screenshot_upload" class="text-xs text-slate-400 mt-1">Uploading…</div>
            <p class="text-xs text-slate-400 mt-1">Or fall back to a URL (used only if no file is uploaded):</p>
            <input type="url" wire:model="screenshot_url" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm mt-1">
        </div>

        <div class="flex gap-6">
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" wire:model="embed_live"> Embed live preview</label>
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" wire:model="featured"> Featured</label>
        </div>

        <div>
            <label class="block text-sm font-medium mb-1">Deliverables</label>
            <textarea wire:model="deliverables" rows="4" placeholder="## Category&#10;- item" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"></textarea>
        </div>

        <div>
            <label class="block text-sm font-medium mb-1">Case study</label>
            <textarea wire:model="case_study" rows="4" placeholder="## Category&#10;- item" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"></textarea>
        </div>

        <div class="flex items-center gap-3 pt-2">
            <button type="submit" class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Save</button>
            <a href="{{ route('admin.products.index') }}" class="text-sm text-slate-500">Cancel</a>
        </div>
    </form>
</div>
