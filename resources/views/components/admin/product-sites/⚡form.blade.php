<?php

use App\Models\ProductSite;
use App\Support\HandlesUploads;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\Rule;
use Livewire\Component;
use Livewire\WithFileUploads;

new class extends Component
{
    use HandlesUploads, WithFileUploads;

    public ?ProductSite $site = null;

    public string $name = '';
    public string $subdomain = '';
    public string $logo_url = '';
    public ?UploadedFile $logo_upload = null;
    public bool $remove_logo = false;
    public string $theme_color = '';
    public string $theme_color_secondary = '';

    public function mount(?ProductSite $site = null): void
    {
        $this->site = $site?->exists ? $site : null;

        if ($this->site) {
            $this->name = $this->site->name;
            $this->subdomain = $this->site->subdomain;
            $this->logo_url = (string) $this->site->logo_url;
            $this->theme_color = (string) $this->site->theme_color;
            $this->theme_color_secondary = (string) $this->site->theme_color_secondary;
        }
    }

    public function save(): void
    {
        $data = $this->validate([
            'name' => ['required', 'string', 'max:255'],
            'subdomain' => [
                'required', 'string', 'max:63', 'regex:/^[a-z0-9-]+$/',
                Rule::notIn(config('tenancy.reserved_subdomains')),
                'unique:product_sites,subdomain,'.($this->site?->id ?? 'NULL').',id',
            ],
            'logo_url' => ['nullable', 'url'],
            'logo_upload' => ['nullable', 'image', 'max:2048'],
            'theme_color' => ['nullable', 'regex:/^#[0-9a-fA-F]{6}$/'],
            'theme_color_secondary' => ['nullable', 'regex:/^#[0-9a-fA-F]{6}$/'],
        ]);

        unset($data['logo_upload']);

        if ($this->logo_upload) {
            $stored = $this->storeUpload($this->logo_upload, 'logos');
            $data = array_merge($data, ['logo_disk' => $stored['disk'], 'logo_path' => $stored['path'], 'logo_mime_type' => $stored['mime_type']]);
        } elseif ($this->remove_logo) {
            $data = array_merge($data, ['logo_disk' => null, 'logo_path' => null, 'logo_mime_type' => null]);
        }

        if ($this->site) {
            $this->site->update($data);
        } else {
            $site = ProductSite::create($data);
            // Only "home" is ever used, matching the current app's single-
            // scroll microsite design — create it implicitly so the nested
            // page builder always has something to edit.
            $site->pages()->create(['slug' => 'home', 'title' => 'Home']);
        }

        session()->flash('status', 'Product site saved.');
        $this->redirectRoute('admin.product-sites.index');
    }
};
?>

<div class="mx-auto max-w-xl px-6 py-10">
    <h1 class="text-xl font-bold mb-6">{{ $site ? 'Edit' : 'New' }} product site</h1>
    <form wire:submit="save" class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-1">Name</label>
                <input type="text" wire:model="name" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                @error('name') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Subdomain</label>
                <input type="text" wire:model="subdomain" {{ $site ? 'disabled' : '' }} class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-50">
                @error('subdomain') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>
        </div>
        <div>
            <label class="block text-sm font-medium mb-1">Logo</label>
            @if ($site?->logo_path && ! $remove_logo)
                <div class="mb-2 flex items-center gap-3">
                    <img src="{{ $site->logoSrc() }}" class="h-10 rounded border border-slate-200">
                    <label class="text-xs text-red-600"><input type="checkbox" wire:model="remove_logo"> Remove</label>
                </div>
            @endif
            <input type="file" wire:model="logo_upload" accept="image/*" class="w-full text-sm">
            @error('logo_upload') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
            <input type="url" wire:model="logo_url" placeholder="Or a logo URL" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm mt-1">
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-1">Theme color</label>
                <input type="text" wire:model="theme_color" placeholder="#0066cc" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                @error('theme_color') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Theme color (secondary)</label>
                <input type="text" wire:model="theme_color_secondary" placeholder="#00c2ff" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                @error('theme_color_secondary') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>
        </div>
        <div class="flex items-center gap-3 pt-2">
            <button type="submit" class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Save</button>
            <a href="{{ route('admin.product-sites.index') }}" class="text-sm text-slate-500">Cancel</a>
        </div>
    </form>
</div>
