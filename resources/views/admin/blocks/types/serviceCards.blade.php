<div class="space-y-3">
    <input type="text" wire:model="editData.{{ $blockId }}.eyebrow" placeholder="Eyebrow" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.heading" placeholder="Heading" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.body" placeholder="Intro text" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <div>
        <label class="block text-xs font-medium mb-1">Items (JSON array of {icon, title, description, points: [..]})</label>
        <textarea wire:model="editData.{{ $blockId }}.items" rows="10" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono"></textarea>
        @error('editData.'.$blockId.'.items') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
    </div>
</div>
