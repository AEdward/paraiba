<div class="space-y-3">
    <input type="text" wire:model="editData.{{ $blockId }}.eyebrow" placeholder="Eyebrow" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.heading" placeholder="Heading" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <textarea wire:model="editData.{{ $blockId }}.body" rows="6" placeholder="Body (blank line between paragraphs)" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></textarea>
    <input type="text" wire:model="editData.{{ $blockId }}.image" placeholder="Image URL" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <input type="text" wire:model="editData.{{ $blockId }}.imageAlt" placeholder="Image description (for accessibility)" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <select wire:model="editData.{{ $blockId }}.imagePosition" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
        <option value="right">Image on the right</option>
        <option value="left">Image on the left</option>
    </select>
</div>
