<?php

use App\Models\SiteSettings;
use Livewire\Component;

new class extends Component
{
    public string $office_location = '';
    public string $phone = '';
    public string $email = '';
    public string $map_embed_url = '';
    public string $facebook_url = '';
    public string $instagram_url = '';
    public string $tiktok_url = '';
    public string $telegram_url = '';
    public string $youtube_url = '';
    public string $linkedin_url = '';

    public function mount(): void
    {
        $settings = SiteSettings::current();
        $this->office_location = $settings->office_location ?? 'Addis Ababa, Ethiopia';
        $this->phone = (string) $settings->phone;
        $this->email = $settings->email ?? 'hello@paraiba.com';
        $this->map_embed_url = (string) $settings->map_embed_url;
        $this->facebook_url = (string) $settings->facebook_url;
        $this->instagram_url = (string) $settings->instagram_url;
        $this->tiktok_url = (string) $settings->tiktok_url;
        $this->telegram_url = (string) $settings->telegram_url;
        $this->youtube_url = (string) $settings->youtube_url;
        $this->linkedin_url = (string) $settings->linkedin_url;
    }

    public function save(): void
    {
        $data = $this->validate([
            'office_location' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'map_embed_url' => ['nullable', 'url'],
            'facebook_url' => ['nullable', 'url'],
            'instagram_url' => ['nullable', 'url'],
            'tiktok_url' => ['nullable', 'url'],
            'telegram_url' => ['nullable', 'url'],
            'youtube_url' => ['nullable', 'url'],
            'linkedin_url' => ['nullable', 'url'],
        ]);

        $settings = SiteSettings::current();
        $settings->fill($data);
        $settings->save();

        session()->flash('status', 'Settings saved.');
    }
};
?>

<div class="mx-auto max-w-2xl px-6 py-10">
    <h1 class="text-xl font-bold mb-6">Site settings</h1>

    @if (session('status'))
        <div class="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">{{ session('status') }}</div>
    @endif

    <form wire:submit="save" class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-1">Office location</label>
                <input type="text" wire:model="office_location" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Phone</label>
                <input type="text" wire:model="phone" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            </div>
        </div>
        <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input type="email" wire:model="email" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
        </div>
        <div>
            <label class="block text-sm font-medium mb-1">Map embed URL</label>
            <input type="url" wire:model="map_embed_url" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div><label class="block text-sm font-medium mb-1">Facebook</label><input type="url" wire:model="facebook_url" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></div>
            <div><label class="block text-sm font-medium mb-1">Instagram</label><input type="url" wire:model="instagram_url" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></div>
            <div><label class="block text-sm font-medium mb-1">TikTok</label><input type="url" wire:model="tiktok_url" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></div>
            <div><label class="block text-sm font-medium mb-1">Telegram</label><input type="url" wire:model="telegram_url" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></div>
            <div><label class="block text-sm font-medium mb-1">YouTube</label><input type="url" wire:model="youtube_url" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></div>
            <div><label class="block text-sm font-medium mb-1">LinkedIn</label><input type="url" wire:model="linkedin_url" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></div>
        </div>
        <button type="submit" class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Save</button>
    </form>
</div>
