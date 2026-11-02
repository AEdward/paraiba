<div class="space-y-3">
    <input type="text" wire:model="editData.{{ $blockId }}.eyebrow" placeholder="Eyebrow" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.heading" placeholder="Heading" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <textarea wire:model="editData.{{ $blockId }}.body" rows="2" placeholder="Body" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></textarea>
    <div class="grid grid-cols-2 gap-3">
        <input type="text" wire:model="editData.{{ $blockId }}.ctaLabel" placeholder="CTA label" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
        <input type="text" wire:model="editData.{{ $blockId }}.ctaHref" placeholder="CTA href" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
    </div>
    <input type="text" wire:model="editData.{{ $blockId }}.imageUrl" placeholder="Photo card image URL" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <div>
        <label class="block text-xs font-medium mb-1">Items (JSON array of {icon, label})</label>
        <textarea wire:model="editData.{{ $blockId }}.items" rows="4" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono"></textarea>
    </div>
</div>
