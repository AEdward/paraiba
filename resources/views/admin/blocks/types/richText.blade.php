<div class="space-y-3">
    <textarea wire:model="editData.{{ $blockId }}.body" rows="6" placeholder="HTML body" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"></textarea>
    <p class="text-xs text-slate-400">Stored as sanitized HTML (ported from Tiptap JSON during data migration).</p>
    <div class="grid grid-cols-2 gap-3">
        <input type="text" wire:model="editData.{{ $blockId }}.imageUrl" placeholder="Side image URL" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
        <select wire:model="editData.{{ $blockId }}.imagePosition" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="right">Right</option><option value="left">Left</option>
        </select>
    </div>
    <input type="text" wire:model="editData.{{ $blockId }}.caption" placeholder="Image caption" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
</div>
