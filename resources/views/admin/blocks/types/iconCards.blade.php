<div class="space-y-3">
    <input type="text" wire:model="editData.{{ $blockId }}.heading" placeholder="Heading (optional)" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <div>
        <label class="block text-xs font-medium mb-1">Items (JSON array of {icon, title, body})</label>
        <textarea wire:model="editData.{{ $blockId }}.items" rows="8" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono"></textarea>
        @error('editData.'.$blockId.'.items') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
    </div>
</div>
