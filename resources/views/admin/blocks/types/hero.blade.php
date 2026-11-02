<div class="space-y-3">
    <div class="grid grid-cols-2 gap-3">
        <input type="text" wire:model="editData.{{ $blockId }}.eyebrow" placeholder="Eyebrow" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
        <select wire:model="editData.{{ $blockId }}.theme" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="dark">Dark</option><option value="light">Light</option>
        </select>
    </div>
    <input type="text" wire:model="editData.{{ $blockId }}.headline" placeholder="Headline" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.headlineHighlight" placeholder="Headline highlight (colored word)" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <textarea wire:model="editData.{{ $blockId }}.subhead" rows="2" placeholder="Subhead" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></textarea>
    <div class="grid grid-cols-2 gap-3">
        <input type="text" wire:model="editData.{{ $blockId }}.primaryLabel" placeholder="Primary button label" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
        <input type="text" wire:model="editData.{{ $blockId }}.primaryHref" placeholder="Primary button href" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
        <input type="text" wire:model="editData.{{ $blockId }}.secondaryLabel" placeholder="Secondary button label" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
        <input type="text" wire:model="editData.{{ $blockId }}.secondaryHref" placeholder="Secondary button href" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
    </div>
    <label class="flex items-center gap-2 text-xs"><input type="checkbox" wire:model="editData.{{ $blockId }}.showLogo3D"> Show 3D logo</label>
    <input type="text" wire:model="editData.{{ $blockId }}.mockupImage" placeholder="Mockup image URL (used if 3D logo is off)" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
</div>
