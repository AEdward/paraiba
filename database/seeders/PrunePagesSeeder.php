<?php

namespace Database\Seeders;

use App\Models\NavItem;
use App\Models\Page;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Removes the pages the site no longer has (Work, Team, Resources,
 * Partners) and every menu item that pointed at them. Blocks are removed
 * with their page via the cascading foreign key.
 */
class PrunePagesSeeder extends Seeder
{
    private const REMOVED_SLUGS = ['work', 'team', 'resources'];

    private const REMOVED_PATHS = ['/work', '/team', '/resources', '/partners'];

    public function run(): void
    {
        [$pages, $nav] = DB::transaction(function () {
            $pages = Page::whereIn('slug', self::REMOVED_SLUGS)->get();
            $pages->each->delete();

            $nav = NavItem::all()->filter(
                fn (NavItem $item) => in_array(rtrim((string) parse_url($item->href, PHP_URL_PATH), '/'), self::REMOVED_PATHS, true)
            );
            $nav->each->delete();

            return [$pages, $nav];
        });

        $this->command?->info('Removed pages: '.($pages->pluck('slug')->implode(', ') ?: 'none'));
        $this->command?->info('Removed menu items: '.($nav->pluck('label')->implode(', ') ?: 'none'));
    }
}
