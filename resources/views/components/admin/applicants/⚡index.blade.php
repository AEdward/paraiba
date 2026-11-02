<?php

use App\Enums\JobApplicationStatus;
use App\Models\JobApplication;
use Livewire\Attributes\Computed;
use Livewire\Component;

new class extends Component
{
    #[Computed]
    public function applications()
    {
        return JobApplication::with(['jobPosting', 'documents'])->orderBy('created_at', 'desc')->get();
    }

    public function updateStatus(string $id, string $status): void
    {
        JobApplication::findOrFail($id)->update(['status' => $status]);
    }
};
?>

<div class="mx-auto max-w-5xl px-6 py-10">
    <h1 class="text-xl font-bold mb-6">Applicants</h1>
    <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table class="w-full text-sm">
            <thead class="bg-slate-50 text-left text-xs uppercase text-slate-500">
                <tr><th class="px-4 py-3">Name</th><th class="px-4 py-3">Job</th><th class="px-4 py-3">Documents</th><th class="px-4 py-3">Status</th></tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                @forelse ($this->applications as $application)
                    <tr wire:key="{{ $application->id }}">
                        <td class="px-4 py-3">
                            <div class="font-medium">{{ $application->name }}</div>
                            <div class="text-xs text-slate-400">{{ $application->email }}</div>
                        </td>
                        <td class="px-4 py-3 text-slate-500">{{ $application->jobPosting?->title }}</td>
                        <td class="px-4 py-3 space-x-2">
                            @foreach ($application->documents as $doc)
                                <a href="{{ route('admin.documents.show', $doc) }}" class="text-slate-600 underline">{{ $doc->file_name }}</a>
                            @endforeach
                        </td>
                        <td class="px-4 py-3">
                            <select wire:change="updateStatus('{{ $application->id }}', $event.target.value)" class="rounded-lg border border-slate-300 px-2 py-1 text-xs">
                                @foreach (JobApplicationStatus::cases() as $case)
                                    <option value="{{ $case->value }}" @selected($application->status === $case)>{{ $case->value }}</option>
                                @endforeach
                            </select>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="4" class="px-4 py-6 text-center text-slate-400">No applications yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
