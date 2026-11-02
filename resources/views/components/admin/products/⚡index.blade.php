<?php

use App\Models\Project;
use Livewire\Attributes\Computed;
use Livewire\Component;
use Livewire\WithPagination;

new class extends Component
{
    use WithPagination;

    #[Computed]
    public function projects()
    {
        return Project::orderBy('created_at', 'desc')->paginate(20);
    }

    public function delete(string $id): void
    {
        Project::findOrFail($id)->delete();
    }
};
?>

<div class="mx-auto max-w-5xl px-6 py-10">
    <div class="flex items-center justify-between mb-6">
        <h1 class="text-xl font-bold">Products</h1>
        <a href="{{ route('admin.products.create') }}"
            class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            New product
        </a>
    </div>

    <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table class="w-full text-sm">
            <thead class="bg-slate-50 text-left text-xs uppercase text-slate-500">
                <tr>
                    <th class="px-4 py-3">Name</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3">Featured</th>
                    <th class="px-4 py-3"></th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                @forelse ($this->projects as $project)
                    <tr wire:key="{{ $project->id }}">
                        <td class="px-4 py-3">
                            <div class="font-medium">{{ $project->name }}</div>
                            <div class="text-xs text-slate-400">{{ $project->slug }}</div>
                        </td>
                        <td class="px-4 py-3">{{ $project->status->value }}</td>
                        <td class="px-4 py-3">{{ $project->featured ? 'Yes' : '' }}</td>
                        <td class="px-4 py-3 text-right space-x-3">
                            <a href="{{ route('admin.products.edit', $project) }}" class="text-slate-600 hover:text-slate-900">Edit</a>
                            <button type="button" wire:click="delete('{{ $project->id }}')"
                                wire:confirm="Delete this product?"
                                class="text-red-600 hover:text-red-800">Delete</button>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="4" class="px-4 py-6 text-center text-slate-400">No products yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="mt-4">{{ $this->projects->links() }}</div>
</div>
