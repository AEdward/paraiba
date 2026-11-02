<div class="space-y-3">
    <p class="text-xs text-slate-400">Pulls the latest N products live — no stored content besides heading/limit.</p>
    <input type="text" wire:model="editData.{{ $blockId }}.eyebrow" placeholder="Eyebrow" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.heading" placeholder="Heading" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="number" wire:model="editData.{{ $blockId }}.limit" placeholder="Limit" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
</div>
