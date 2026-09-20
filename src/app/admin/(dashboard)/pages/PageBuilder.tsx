"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, ChevronUp, GripVertical, Plus, Trash2 } from "lucide-react";
import {
  BLOCK_TYPES,
  BLOCK_DESCRIPTIONS,
  BLOCK_LABELS,
  type BlockRecord,
  type BlockType,
  type PageSlug,
} from "@/lib/blocks/types";
import { BlockFields } from "./BlockFields";
import { addBlock, deleteBlock, reorderBlocks, updateBlockData } from "./actions";

export function PageBuilder({ pageSlug, blocks }: { pageSlug: PageSlug; blocks: BlockRecord[] }) {
  const [items, setItems] = useState(blocks);
  const [openId, setOpenId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  // Re-sync when the server component re-renders with fresh data (after any
  // action's revalidatePath) — e.g. a block was just added, edited, or deleted.
  // Adjusting state during render (rather than in an effect) is the pattern
  // React recommends for "reset state when a prop changes".
  const [prevBlocks, setPrevBlocks] = useState(blocks);
  if (blocks !== prevBlocks) {
    setPrevBlocks(blocks);
    setItems(blocks);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((b) => b.id === active.id);
    const newIndex = items.findIndex((b) => b.id === over.id);
    const next = arrayMove(items, oldIndex, newIndex);
    setItems(next);
    reorderBlocks(pageSlug, next.map((b) => b.id));
  }

  return (
    <div>
      <DndContext
        id={`page-builder-${pageSlug}`}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-3">
            {items.map((block) => (
              <BlockCard
                key={block.id}
                block={block}
                pageSlug={pageSlug}
                open={openId === block.id}
                onToggle={() => setOpenId((id) => (id === block.id ? null : block.id))}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {items.length === 0 && (
        <p className="mt-4 text-center text-sm opacity-50">
          No blocks yet — add the first one below.
        </p>
      )}

      <div className="relative mt-4">
        <button
          type="button"
          onClick={() => setAddOpen((v) => !v)}
          className="font-display inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-(--color-cream)"
          style={{ background: "var(--color-indigo)" }}
        >
          <Plus size={15} /> Add block
        </button>

        {addOpen && (
          <div
            className="absolute z-10 mt-2 w-96 max-w-[90vw] rounded-xl border p-2 shadow-lg"
            style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
          >
            {BLOCK_TYPES.map((type) => (
              <AddBlockOption key={type} type={type} pageSlug={pageSlug} onAdded={() => setAddOpen(false)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AddBlockOption({
  type,
  pageSlug,
  onAdded,
}: {
  type: BlockType;
  pageSlug: PageSlug;
  onAdded: () => void;
}) {
  return (
    <button
      type="button"
      onClick={async () => {
        onAdded();
        await addBlock(pageSlug, type);
      }}
      className="block w-full rounded-lg px-3 py-2 text-left transition-colors hover:opacity-100"
      style={{ opacity: 0.85 }}
    >
      <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
        {BLOCK_LABELS[type]}
      </p>
      <p className="text-xs opacity-60">{BLOCK_DESCRIPTIONS[type]}</p>
    </button>
  );
}

function BlockCard({
  block,
  pageSlug,
  open,
  onToggle,
}: {
  block: BlockRecord;
  pageSlug: PageSlug;
  open: boolean;
  onToggle: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });
  const boundUpdate = updateBlockData.bind(null, block.id, pageSlug);
  const boundDelete = deleteBlock.bind(null, pageSlug);

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        borderColor: "var(--border-soft)",
        background: "var(--surface)",
        opacity: isDragging ? 0.5 : 1,
      }}
      className="rounded-xl border"
    >
      <div className="flex items-center gap-2 px-3 py-2.5">
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
          className="cursor-grab touch-none opacity-50 hover:opacity-90 active:cursor-grabbing"
        >
          <GripVertical size={16} />
        </button>
        <button type="button" onClick={onToggle} className="flex flex-1 items-center justify-between text-left">
          <span className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
            {BLOCK_LABELS[block.type]}
          </span>
          {open ? <ChevronUp size={16} opacity={0.5} /> : <ChevronDown size={16} opacity={0.5} />}
        </button>
        <form
          action={boundDelete}
          onSubmit={(e) => {
            if (!confirm("Delete this block? This can't be undone.")) e.preventDefault();
          }}
        >
          <input type="hidden" name="id" value={block.id} />
          <button type="submit" aria-label="Delete block" style={{ color: "var(--color-ember)" }}>
            <Trash2 size={16} />
          </button>
        </form>
      </div>

      {open && (
        <form action={boundUpdate} className="border-t px-4 py-4" style={{ borderColor: "var(--border-soft)" }}>
          <BlockFields block={block} />
          <button
            type="submit"
            className="font-display mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-(--color-cream)"
            style={{ background: "var(--color-indigo)" }}
          >
            Save block
          </button>
        </form>
      )}
    </div>
  );
}
