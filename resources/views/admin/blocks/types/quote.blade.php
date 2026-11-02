<div class="space-y-3">
    <div>
        <label class="block text-xs font-medium mb-1">Lines (JSON array of strings)</label>
        <textarea wire:model="editData.{{ $blockId }}.lines" rows="4" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono"></textarea>
    </div>
    <input type="text" wire:model="editData.{{ $blockId }}.highlight" placeholder="Highlighted word/phrase" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
</div>
