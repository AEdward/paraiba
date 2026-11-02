<div class="space-y-3">
    <input type="text" wire:model="editData.{{ $blockId }}.eyebrow" placeholder="Eyebrow" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.heading" placeholder="Heading" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <div>
        <label class="block text-xs font-medium mb-1">Tech keys (JSON array of strings, e.g. ["react","laravel","mysql"])</label>
        <textarea wire:model="editData.{{ $blockId }}.keys" rows="3" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono"></textarea>
    </div>
</div>
