<div class="space-y-3">
    <input type="text" wire:model="editData.{{ $blockId }}.eyebrow" placeholder="Eyebrow" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.heading" placeholder="Heading" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <textarea wire:model="editData.{{ $blockId }}.body" rows="2" placeholder="Body" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></textarea>
    <div class="grid grid-cols-2 gap-3">
        <input type="text" wire:model="editData.{{ $blockId }}.primaryLabel" placeholder="Primary label" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
        <input type="text" wire:model="editData.{{ $blockId }}.primaryHref" placeholder="Primary href" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
        <input type="text" wire:model="editData.{{ $blockId }}.secondaryLabel" placeholder="Secondary label" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
        <input type="text" wire:model="editData.{{ $blockId }}.secondaryHref" placeholder="Secondary href" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
    </div>
</div>
