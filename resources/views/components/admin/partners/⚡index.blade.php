<?php

use App\Models\Partner;
use Livewire\Attributes\Computed;
use Livewire\Component;

new class extends Component
{
    #[Computed]
    public function partners()
    {
        return Partner::orderBy('order')->get();
    }

    public function delete(string $id): void
    {
        Partner::findOrFail($id)->delete();
    }
};
?>

<div class="mx-auto max-w-4xl px-6 py-10">
    <div class="flex items-center justify-between mb-6">
        <h1 class="text-xl font-bold">Partners</h1>
        <a href="{{ route('admin.partners.create') }}" class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">New partner</a>
    </div>
    <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table class="w-full text-sm">
            <thead class="bg-slate-50 text-left text-xs uppercase text-slate-500">
                <tr><th class="px-4 py-3">Name</th><th class="px-4 py-3">Website</th><th class="px-4 py-3">Order</th><th class="px-4 py-3"></th></tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                @forelse ($this->partners as $partner)
                    <tr wire:key="{{ $partner->id }}">
                        <td class="px-4 py-3">{{ $partner->name }}</td>
                        <td class="px-4 py-3 text-slate-500">{{ $partner->website }}</td>
                        <td class="px-4 py-3">{{ $partner->order }}</td>
                        <td class="px-4 py-3 text-right space-x-3">
                            <a href="{{ route('admin.partners.edit', $partner) }}" class="text-slate-600 hover:text-slate-900">Edit</a>
                            <button wire:click="delete('{{ $partner->id }}')" wire:confirm="Delete this partner?" class="text-red-600 hover:text-red-800">Delete</button>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="4" class="px-4 py-6 text-center text-slate-400">No partners yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
