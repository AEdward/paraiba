<?php

use App\Enums\NavLocation;
use App\Models\NavItem;
use Illuminate\Validation\Rule;
use Livewire\Component;

new class extends Component
{
    public ?NavItem $item = null;

    public string $label = '';
    public string $href = '';
    public string $location = 'both';
    public string $group = '';
    public int $order = 0;
    public bool $new_tab = false;

    public function mount(?NavItem $item = null): void
    {
        $this->item = $item?->exists ? $item : null;

        if ($this->item) {
            $this->label = $this->item->label;
            $this->href = $this->item->href;
            $this->location = $this->item->location->value;
            $this->group = (string) $this->item->group;
            $this->order = $this->item->order;
            $this->new_tab = $this->item->new_tab;
        }
    }

    public function save(): void
    {
        $data = $this->validate([
            'label' => ['required', 'string', 'max:255'],
            'href' => ['required', 'string', 'max:255'],
            'location' => ['required', Rule::enum(NavLocation::class)],
            'group' => ['nullable', 'string', 'max:255'],
            'order' => ['required', 'integer'],
            'new_tab' => ['boolean'],
        ]);

        if ($this->item) {
            $this->item->update($data);
        } else {
            NavItem::create($data);
        }

        session()->flash('status', 'Menu item saved.');
        $this->redirectRoute('admin.menu.index');
    }
};
?>

<div class="mx-auto max-w-xl px-6 py-10">
    <h1 class="text-xl font-bold mb-6">{{ $item ? 'Edit' : 'New' }} menu item</h1>
    <form wire:submit="save" class="space-y-5">
        <div>
            <label class="block text-sm font-medium mb-1">Label</label>
            <input type="text" wire:model="label" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            @error('label') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
        </div>
        <div>
            <label class="block text-sm font-medium mb-1">Href</label>
            <input type="text" wire:model="href" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            @error('href') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-1">Location</label>
                <select wire:model="location" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                    @foreach (App\Enums\NavLocation::cases() as $case)
                        <option value="{{ $case->value }}">{{ $case->value }}</option>
                    @endforeach
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Order</label>
                <input type="number" wire:model="order" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            </div>
        </div>
        <div>
            <label class="block text-sm font-medium mb-1">Group (optional dropdown/column label)</label>
            <input type="text" wire:model="group" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
        </div>
        <label class="flex items-center gap-2 text-sm"><input type="checkbox" wire:model="new_tab"> Open in new tab</label>
        <div class="flex items-center gap-3 pt-2">
            <button type="submit" class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Save</button>
            <a href="{{ route('admin.menu.index') }}" class="text-sm text-slate-500">Cancel</a>
        </div>
    </form>
</div>
