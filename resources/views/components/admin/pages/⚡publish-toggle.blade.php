<?php

use App\Models\Page;
use Livewire\Component;

new class extends Component
{
    public Page $page;

    public function toggle(): void
    {
        $this->page->update(['published' => ! $this->page->published]);
    }
};
?>

<label class="flex items-center gap-2 text-sm">
    <input type="checkbox" wire:click="toggle" @checked($page->published)> Published
</label>
