<?php

use App\Models\ContactSubmission;
use Livewire\Attributes\Computed;
use Livewire\Component;

new class extends Component
{
    #[Computed]
    public function messages()
    {
        return ContactSubmission::orderBy('created_at', 'desc')->get();
    }

    public function toggleRead(string $id): void
    {
        $submission = ContactSubmission::findOrFail($id);
        $submission->update(['read' => ! $submission->read]);
    }

    public function delete(string $id): void
    {
        ContactSubmission::findOrFail($id)->delete();
    }
};
?>

<div class="mx-auto max-w-4xl px-6 py-10">
    <h1 class="text-xl font-bold mb-6">Messages</h1>
    <div class="overflow-hidden rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">
        @forelse ($this->messages as $message)
            <div wire:key="{{ $message->id }}" class="px-4 py-3 {{ $message->read ? 'opacity-60' : '' }}">
                <div class="flex items-center justify-between">
                    <div>
                        <span class="font-medium">{{ $message->name }}</span>
                        <span class="text-xs text-slate-400 ml-2">{{ $message->email }}</span>
                    </div>
                    <div class="space-x-3 text-xs">
                        <button wire:click="toggleRead('{{ $message->id }}')" class="text-slate-600 hover:text-slate-900">{{ $message->read ? 'Mark unread' : 'Mark read' }}</button>
                        <button wire:click="delete('{{ $message->id }}')" wire:confirm="Delete this message?" class="text-red-600 hover:text-red-800">Delete</button>
                    </div>
                </div>
                <p class="mt-2 text-sm text-slate-600">{{ $message->message }}</p>
            </div>
        @empty
            <div class="px-4 py-6 text-center text-slate-400">No messages yet.</div>
        @endforelse
    </div>
</div>
