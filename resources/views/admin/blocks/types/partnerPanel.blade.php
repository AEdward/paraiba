<div class="space-y-3">
    <input type="text" wire:model="editData.{{ $blockId }}.heading" placeholder="Heading" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <textarea wire:model="editData.{{ $blockId }}.body" rows="3" placeholder="Body" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></textarea>
    <div>
        <label class="block text-xs font-medium mb-1">Points (JSON array of {icon, label})</label>
        <textarea wire:model="editData.{{ $blockId }}.items" rows="8" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono"></textarea>
        @error('editData.'.$blockId.'.items') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
    </div>
</div>
