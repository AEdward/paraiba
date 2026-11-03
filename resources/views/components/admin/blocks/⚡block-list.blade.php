<?php

use App\Models\Block;
use App\Models\Page;
use App\Models\ProductBlock;
use App\Models\ProductPage;
use App\Support\Blocks\BlockTypeRegistry;
use Livewire\Attributes\Computed;
use Livewire\Component;

new class extends Component
{
    public string $ownerType; // 'page' | 'product_page'
    public string $ownerId;
    public ?string $addingType = null;
    public array $expanded = []; // block ids currently expanded for editing
    public array $editData = []; // [block id => data array] while editing

    public function mount(string $ownerType, string $ownerId): void
    {
        $this->ownerType = $ownerType;
        $this->ownerId = $ownerId;
    }

    protected function ownerModel(): Page|ProductPage
    {
        return $this->ownerType === 'page'
            ? Page::findOrFail($this->ownerId)
            : ProductPage::findOrFail($this->ownerId);
    }

    protected function blockModelClass(): string
    {
        return $this->ownerType === 'page' ? Block::class : ProductBlock::class;
    }

    protected function ownerColumn(): string
    {
        return $this->ownerType === 'page' ? 'page_id' : 'product_page_id';
    }

    #[Computed]
    public function blocks()
    {
        return $this->blockModelClass()::where($this->ownerColumn(), $this->ownerId)
            ->orderBy('order')
            ->get();
    }

    public function availableTypes(): array
    {
        return $this->ownerType === 'page' ? BlockTypeRegistry::ALL_TYPES : BlockTypeRegistry::MICROSITE_TYPES;
    }

    public function addBlock(): void
    {
        if (! $this->addingType || ! in_array($this->addingType, $this->availableTypes(), true)) {
            return;
        }

        $maxOrder = $this->blocks->max('order') ?? -1;

        $block = $this->blockModelClass()::create([
            $this->ownerColumn() => $this->ownerId,
            'type' => $this->addingType,
            'order' => $maxOrder + 1,
            'data' => BlockTypeRegistry::defaultData($this->addingType),
        ]);

        $this->addingType = null;
        unset($this->blocks);
        $this->toggle($block->id);
    }

    public function toggle(string $blockId): void
    {
        if (in_array($blockId, $this->expanded, true)) {
            $this->expanded = array_diff($this->expanded, [$blockId]);

            return;
        }

        $block = $this->blockModelClass()::findOrFail($blockId);
        $data = $block->data;

        foreach (BlockTypeRegistry::JSON_FIELDS[$block->type] ?? [] as $field) {
            $data[$field] = json_encode($data[$field] ?? [], JSON_PRETTY_PRINT);
        }

        $this->editData[$blockId] = $data;
        $this->expanded[] = $blockId;
    }

    public function saveBlock(string $blockId): void
    {
        $block = $this->blockModelClass()::findOrFail($blockId);
        $data = $this->editData[$blockId];

        foreach (BlockTypeRegistry::JSON_FIELDS[$block->type] ?? [] as $field) {
            $decoded = json_decode($data[$field] ?? '[]', true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                $this->addError("editData.{$blockId}.{$field}", 'Invalid JSON.');

                return;
            }
            $data[$field] = $decoded;
        }

        $block->update(['data' => $data]);
        unset($this->blocks);
        session()->flash('status', 'Block saved.');
    }

    public function deleteBlock(string $blockId): void
    {
        $this->blockModelClass()::findOrFail($blockId)->delete();
        $this->expanded = array_diff($this->expanded, [$blockId]);
        unset($this->blocks);
    }

    public function reorder(array $orderedIds): void
    {
        foreach ($orderedIds as $i => $id) {
            $this->blockModelClass()::where('id', $id)->update(['order' => $i]);
        }
        unset($this->blocks);
    }

    public function moveBlock(string $blockId, int $direction): void
    {
        $blocks = $this->blocks->values();
        $index = $blocks->search(fn ($b) => $b->id === $blockId);
        $target = $index === false ? false : $index + $direction;

        if ($index === false || $target < 0 || $target >= $blocks->count()) {
            return;
        }

        $a = $blocks[$index];
        $b = $blocks[$target];

        $this->blockModelClass()::where('id', $a->id)->update(['order' => $b->order]);
        $this->blockModelClass()::where('id', $b->id)->update(['order' => $a->order]);

        unset($this->blocks);
    }
};
?>

<div>
    @if (session('status'))
        <div class="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-2 text-sm text-green-700">{{ session('status') }}</div>
    @endif

    <div class="flex items-center gap-3 mb-6">
        <select wire:model="addingType" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="">Add a block…</option>
            @foreach ($this->availableTypes() as $type)
                <option value="{{ $type }}">{{ \App\Support\Blocks\BlockTypeRegistry::LABELS[$type] }}</option>
            @endforeach
        </select>
        <button wire:click="addBlock" class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Add</button>
    </div>

    <div class="space-y-3" x-data="{
        sortable: null,
        init() {
            this.sortable = new Sortable($refs.list, {
                handle: '.drag-handle',
                animation: 150,
                onEnd: () => {
                    const ids = [...$refs.list.children].map(el => el.dataset.id);
                    $wire.reorder(ids);
                }
            });
        }
    }" x-ref="list">
        @foreach ($this->blocks as $block)
            <div wire:key="{{ $block->id }}" data-id="{{ $block->id }}" class="rounded-xl border border-slate-200 bg-white">
                <div class="flex items-center justify-between px-4 py-3">
                    <div class="flex items-center gap-3">
                        <span class="drag-handle cursor-move text-slate-300" aria-label="Drag to reorder block" role="img">⠿</span>
                        <div class="flex flex-col -my-1">
                            <button wire:click="moveBlock('{{ $block->id }}', -1)" @disabled($loop->first) aria-label="Move block up" class="text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed leading-none">▲</button>
                            <button wire:click="moveBlock('{{ $block->id }}', 1)" @disabled($loop->last) aria-label="Move block down" class="text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed leading-none">▼</button>
                        </div>
                        <span class="font-medium text-sm">{{ \App\Support\Blocks\BlockTypeRegistry::LABELS[$block->type] ?? $block->type }}</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <button wire:click="toggle('{{ $block->id }}')" class="text-xs text-slate-600 hover:text-slate-900">
                            {{ in_array($block->id, $expanded, true) ? 'Collapse' : 'Edit' }}
                        </button>
                        <button wire:click="deleteBlock('{{ $block->id }}')" wire:confirm="Delete this block?" class="text-xs text-red-600 hover:text-red-800">Delete</button>
                    </div>
                </div>

                @if (in_array($block->id, $expanded, true))
                    <div class="border-t border-slate-100 px-4 py-4">
                        @include('admin.blocks.types.'.(in_array($block->type, array_keys(\App\Support\Blocks\BlockTypeRegistry::LABELS)) ? $block->type : 'fallback'), ['blockId' => $block->id])
                        <button wire:click="saveBlock('{{ $block->id }}')" class="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800">Save block</button>
                    </div>
                @endif
            </div>
        @endforeach
    </div>
</div>

@once
    @push('head')
        <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js" defer></script>
    @endpush
@endonce
