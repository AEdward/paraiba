<div class="space-y-3">
    <p class="text-xs text-slate-400">
        Elements (JSON array). Each element: <code>{"type": "...", ...fields}</code>.
        Supported types: {{ implode(', ', \App\Support\Blocks\BlockTypeRegistry::SECTION_ELEMENT_TYPES) }}.
        A <code>columns</code> element's <code>columns</code> field is an array of element arrays (recursive).
    </p>
    <textarea wire:model="editData.{{ $blockId }}.elements" rows="14" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono"></textarea>
    @error('editData.'.$blockId.'.elements') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
</div>
