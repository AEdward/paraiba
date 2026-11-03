<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Adds the partners logo strip to the homepage, just above the closing
 * call-to-action. Safe to re-run: it won't add a second one.
 */
class HomePartnersSeeder extends Seeder
{
    public function run(): void
    {
        $home = Page::where('slug', 'home')->first();

        if (! $home) {
            $this->command?->warn('No homepage found.');

            return;
        }

        if ($home->blocks()->where('type', 'partnersTrustBar')->exists()) {
            $this->command?->info('Homepage already has a partners section.');

            return;
        }

        DB::transaction(function () use ($home) {
            $blocks = $home->blocks()->orderBy('order')->get();
            $ctaIndex = $blocks->search(fn ($b) => $b->type === 'cta');
            $insertAt = $ctaIndex === false ? $blocks->count() : $ctaIndex;

            $new = $home->blocks()->create([
                'type' => 'partnersTrustBar',
                'order' => 0,
                'data' => ['eyebrow' => 'Trusted by', 'heading' => 'Growing together with amazing clients.'],
            ]);

            $ordered = $blocks->values()->all();
            array_splice($ordered, $insertAt, 0, [$new]);
            foreach ($ordered as $i => $block) {
                $block->update(['order' => $i + 1]);
            }
        });

        $this->command?->info('Partners section added to the homepage.');
    }
}
