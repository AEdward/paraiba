<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    // Mirrors the old app's fixed PAGE_SLUGS constant.
    private const PAGES = [
        'home' => 'Home',
        'about' => 'About',
        'careers' => 'Careers',
        'contact' => 'Contact',
        'products' => 'Products',
        'solutions' => 'Solutions',
        'services' => 'Services',
    ];

    public function run(): void
    {
        foreach (self::PAGES as $slug => $title) {
            Page::firstOrCreate(['slug' => $slug], ['title' => $title, 'published' => true]);
        }

        $this->command->info('Seeded '.count(self::PAGES).' fixed pages.');
    }
}
