<div class="space-y-3">
    <div>
        <label class="block text-xs font-medium mb-1">Stats (JSON array of {label, value})</label>
        <textarea wire:model="editData.{{ $blockId }}.items" rows="4" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono"></textarea>
    </div>
    <textarea wire:model="editData.{{ $blockId }}.quote" rows="3" placeholder="Pull-quote" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></textarea>
    <input type="text" wire:model="editData.{{ $blockId }}.attribution" placeholder="Attribution" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
</div>
