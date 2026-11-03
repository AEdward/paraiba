<div class="space-y-3">
    <input type="text" wire:model="editData.{{ $blockId }}.heading" placeholder="Heading" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
    <textarea wire:model="editData.{{ $blockId }}.body" rows="3" placeholder="Paragraph" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></textarea>
</div>
