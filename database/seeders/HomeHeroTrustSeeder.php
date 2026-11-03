<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Moves the homepage's separate stats bar (AI-first thinking, Built in
 * Ethiopia, ...) into the hero block's `trust` list so both render as one
 * section, then removes the standalone bar. Safe to re-run.
 */
class HomeHeroTrustSeeder extends Seeder
{
    public function run(): void
    {
        $home = Page::where('slug', 'home')->first();
        $hero = $home?->blocks()->where('type', 'hero')->orderBy('order')->first();

        if (! $hero) {
            $this->command?->warn('No homepage hero found; nothing to do.');

            return;
        }

        $bar = $home->blocks()->where('type', 'statsBar')->orderBy('order')->first();
        $data = $hero->data;

        $data['trust'] = $bar
            ? collect($bar->data['items'] ?? [])->map(fn ($i) => ['icon' => $i['icon'] ?? 'star', 'label' => $i['label'] ?? ''])->values()->all()
            : ($data['trust'] ?? [
                ['icon' => 'cpu', 'label' => 'AI-first thinking'],
                ['icon' => 'mapPin', 'label' => 'Built in Ethiopia'],
                ['icon' => 'gem', 'label' => 'Thoughtful design'],
                ['icon' => 'handshake', 'label' => 'Long-term partnership'],
            ]);

        DB::transaction(function () use ($hero, $data, $bar) {
            $hero->update(['data' => $data]);
            $bar?->delete();
        });

        $this->command?->info('Hero now carries '.count($data['trust']).' trust points'.($bar ? '; standalone bar removed.' : '.'));
    }
}
