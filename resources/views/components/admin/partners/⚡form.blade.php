<?php

use App\Models\Partner;
use App\Support\HandlesUploads;
use Illuminate\Http\UploadedFile;
use Livewire\Component;
use Livewire\WithFileUploads;

new class extends Component
{
    use HandlesUploads, WithFileUploads;

    public ?Partner $partner = null;

    public string $name = '';
    public string $logo_url = '';
    public ?UploadedFile $logo_upload = null;
    public bool $remove_logo = false;
    public string $website = '';
    public int $order = 0;

    public function mount(?Partner $partner = null): void
    {
        $this->partner = $partner?->exists ? $partner : null;

        if ($this->partner) {
            $this->name = $this->partner->name;
            $this->logo_url = (string) $this->partner->logo_url;
            $this->website = (string) $this->partner->website;
            $this->order = $this->partner->order;
        }
    }

    public function save(): void
    {
        $data = $this->validate([
            'name' => ['required', 'string', 'max:255'],
            'logo_url' => ['nullable', 'url'],
            'logo_upload' => ['nullable', 'image', 'max:2048'],
            'website' => ['nullable', 'url'],
            'order' => ['required', 'integer'],
        ]);

        unset($data['logo_upload']);

        if ($this->logo_upload) {
            $stored = $this->storeUpload($this->logo_upload, 'logos');
            $data = array_merge($data, [
                'logo_disk' => $stored['disk'],
                'logo_path' => $stored['path'],
                'logo_mime_type' => $stored['mime_type'],
            ]);
        } elseif ($this->remove_logo) {
            $data = array_merge($data, ['logo_disk' => null, 'logo_path' => null, 'logo_mime_type' => null]);
        }

        if ($this->partner) {
            $this->partner->update($data);
        } else {
            Partner::create($data);
        }

        session()->flash('status', 'Partner saved.');
        $this->redirectRoute('admin.partners.index');
    }
};
?>

<div class="mx-auto max-w-xl px-6 py-10">
    <h1 class="text-xl font-bold mb-6">{{ $partner ? 'Edit' : 'New' }} partner</h1>
    <form wire:submit="save" class="space-y-5">
        <div>
            <label class="block text-sm font-medium mb-1">Name</label>
            <input type="text" wire:model="name" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            @error('name') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
        </div>
        <div>
            <label class="block text-sm font-medium mb-1">Logo</label>
            @if ($partner?->logo_path && ! $remove_logo)
                <div class="mb-2 flex items-center gap-3">
                    <img src="{{ $partner->logoSrc() }}" class="h-12 rounded border border-slate-200">
                    <label class="text-xs text-red-600"><input type="checkbox" wire:model="remove_logo"> Remove</label>
                </div>
            @endif
            <input type="file" wire:model="logo_upload" accept="image/*" class="w-full text-sm">
            @error('logo_upload') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
            <div wire:loading wire:target="logo_upload" class="text-xs text-slate-400 mt-1">Uploading…</div>
            <p class="text-xs text-slate-400 mt-1">Or fall back to a URL:</p>
            <input type="url" wire:model="logo_url" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm mt-1">
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-1">Website</label>
                <input type="url" wire:model="website" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Order</label>
                <input type="number" wire:model="order" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            </div>
        </div>
        <div class="flex items-center gap-3 pt-2">
            <button type="submit" class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Save</button>
            <a href="{{ route('admin.partners.index') }}" class="text-sm text-slate-500">Cancel</a>
        </div>
    </form>
</div>
