<div class="space-y-3">
    <input type="text" wire:model="editData.{{ $blockId }}.eyebrow" placeholder="Eyebrow" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.heading" placeholder="Heading" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.body" placeholder="Body" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.footnote" placeholder="Footnote" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <div>
        <label class="block text-xs font-medium mb-1">Items (JSON array of {name, nameAccent, accentStyle, nameItalic, logoImage, tagline, buttonLabel, buttonHref, device, image})</label>
        <textarea wire:model="editData.{{ $blockId }}.items" rows="8" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono"></textarea>
        @error('editData.'.$blockId.'.items') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
    </div>
</div>
