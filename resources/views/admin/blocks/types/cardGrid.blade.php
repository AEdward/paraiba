<div class="space-y-3">
    <div class="grid grid-cols-3 gap-3">
        <input type="text" wire:model="editData.{{ $blockId }}.eyebrow" placeholder="Eyebrow" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
        <select wire:model="editData.{{ $blockId }}.columns" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="2">2 columns</option><option value="3">3 columns</option>
        </select>
        <select wire:model="editData.{{ $blockId }}.layout" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="grid">Grid</option><option value="split">Split</option>
        </select>
    </div>
    <input type="text" wire:model="editData.{{ $blockId }}.heading" placeholder="Heading" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.imageUrl" placeholder="Image URL (split layout only)" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <div>
        <label class="block text-xs font-medium mb-1">Items (JSON array of {icon, number, label, title, desc})</label>
        <textarea wire:model="editData.{{ $blockId }}.items" rows="6" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono"></textarea>
        @error('editData.'.$blockId.'.items') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
    </div>
</div>
