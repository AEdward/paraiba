<?php

use App\Models\ApplicationDocument;
use App\Models\JobApplication;
use App\Models\JobPosting;
use App\Support\HandlesUploads;
use Illuminate\Http\UploadedFile;
use Livewire\Attributes\Locked;
use Livewire\Component;
use Livewire\WithFileUploads;

new class extends Component
{
    use HandlesUploads, WithFileUploads;

    #[Locked]
    public string $jobId;

    public string $name = '';
    public string $email = '';
    public string $phone = '';
    public string $cover_letter = '';

    /** @var UploadedFile[] */
    public array $documents = [];

    public bool $submitted = false;

    public function mount(JobPosting $job): void
    {
        $this->jobId = $job->id;
    }

    /**
     * Mirrors /api/applications' validation exactly, including the
     * existing (intentionally preserved) gap: it does not re-check
     * status = open, so a direct link to a closed posting can still
     * submit — not something this rewrite should silently fix.
     */
    public function save(): void
    {
        $this->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'cover_letter' => ['nullable', 'string'],
            'documents.*' => ['nullable', 'file', 'max:8192', 'mimes:pdf,doc,docx,jpg,jpeg,png,gif,webp'],
        ]);

        $job = JobPosting::findOrFail($this->jobId);

        $application = JobApplication::create([
            'job_posting_id' => $job->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone ?: null,
            'cover_letter' => $this->cover_letter ?: null,
        ]);

        foreach ($this->documents as $file) {
            $stored = $this->storeUpload($file, 'applications', disk: 'private');

            ApplicationDocument::create([
                'job_application_id' => $application->id,
                'file_name' => $file->getClientOriginalName(),
                'mime_type' => $stored['mime_type'],
                'disk' => $stored['disk'],
                'path' => $stored['path'],
            ]);
        }

        $this->reset(['name', 'email', 'phone', 'cover_letter', 'documents']);
        $this->submitted = true;
    }
};
?>

<div id="apply">
    @if ($submitted)
        <div class="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
            Thanks — your application has been received.
        </div>
    @else
        <form wire:submit="save" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="apply-name" class="block text-sm font-medium mb-1">Full name</label>
                    <input id="apply-name" type="text" wire:model="name" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm">
                    @error('name') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
                </div>
                <div>
                    <label for="apply-email" class="block text-sm font-medium mb-1">Email</label>
                    <input id="apply-email" type="email" wire:model="email" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm">
                    @error('email') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
                </div>
            </div>
            <div>
                <label for="apply-phone" class="block text-sm font-medium mb-1">Phone <span class="text-slate-400 font-normal">(optional)</span></label>
                <input id="apply-phone" type="text" wire:model="phone" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm">
            </div>
            <div>
                <label for="apply-cover-letter" class="block text-sm font-medium mb-1">Cover letter <span class="text-slate-400 font-normal">(optional)</span></label>
                <textarea id="apply-cover-letter" wire:model="cover_letter" rows="4" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm"></textarea>
            </div>
            <div>
                <label for="apply-documents" class="block text-sm font-medium mb-1">Documents</label>
                <input id="apply-documents" type="file" wire:model="documents" multiple accept=".pdf,.doc,.docx,image/*" class="w-full text-sm">
                <p class="text-xs text-slate-400 mt-1">PDF, Word, or image files, up to 8MB each.</p>
                @error('documents.*') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
                <div wire:loading wire:target="documents" class="text-xs text-slate-400 mt-1">Uploading…</div>
            </div>
            <button type="submit" wire:loading.attr="disabled" wire:target="save" class="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed">
                <span wire:loading.remove wire:target="save">Apply now</span>
                <span wire:loading wire:target="save">Submitting…</span>
            </button>
        </form>
    @endif
</div>
