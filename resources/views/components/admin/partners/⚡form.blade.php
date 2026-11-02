<?php

use App\Models\Partner;
use Livewire\Component;

new class extends Component
{
    public ?Partner $partner = null;

    public string $name = '';
    public string $logo_url = '';
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
            'website' => ['nullable', 'url'],
            'order' => ['required', 'integer'],
        ]);

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
            <label class="block text-sm font-medium mb-1">Logo URL</label>
            <input type="url" wire:model="logo_url" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <p class="text-xs text-slate-400 mt-1">Uploaded logos land in Phase 3.</p>
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
