<div class="space-y-3">
    <input type="text" wire:model="editData.{{ $blockId }}.breadcrumb" placeholder="Breadcrumb label" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.eyebrow" placeholder="Eyebrow" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.headlineTop" placeholder="Headline first line (optional)" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.headline" placeholder="Headline" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.headlineHighlight" placeholder="Headline highlight (blue)" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.subhead" placeholder="Subhead" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.image" placeholder="Image URL (optional, shows on the right)" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.imageAlt" placeholder="Image description" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
</div>
