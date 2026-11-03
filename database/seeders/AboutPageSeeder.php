<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Rebuilds the About page from scratch. Safe to re-run. All copy is
 * editable afterwards in the admin page builder.
 */
class AboutPageSeeder extends Seeder
{
    public function run(): void
    {
        $page = Page::firstOrCreate(['slug' => 'about'], ['title' => 'About', 'published' => true]);
        $blocks = self::blocks();

        DB::transaction(function () use ($page, $blocks) {
            $page->blocks()->delete();
            foreach ($blocks as $i => [$type, $data]) {
                $page->blocks()->create(['type' => $type, 'order' => $i + 1, 'data' => $data]);
            }
            $page->update(['published' => true]);
        });

        $this->command?->info('About page rebuilt with '.count($blocks).' blocks.');
    }

    public static function blocks(): array
    {
        return [
            ['pageHeader', [
                'breadcrumb' => 'About Us',
                'eyebrow' => 'About Paraiba',
                'headlineTop' => 'Built in Ethiopia.',
                'headline' => 'Driven by ',
                'headlineHighlight' => 'possibility.',
                'subhead' => 'We are an AI-focused software company building practical digital products for people and businesses.',
                'image' => '/addis-ababa-park-sunset.webp',
                'imageAlt' => 'Addis Ababa skyline',
            ]],
            ['introSplit', [
                'heading' => 'Technology with a clear purpose.',
                'body' => 'Paraiba Technology PLC brings software engineering, design, and AI thinking together to solve real problems. We build our own platforms and work with businesses to create software around their needs.',
            ]],
            ['iconCards', [
                'items' => [
                    ['icon' => 'goal', 'title' => 'Our Mission', 'body' => 'To create useful, accessible digital solutions that help people connect and businesses work better.'],
                    ['icon' => 'eye', 'title' => 'Our Vision', 'body' => 'To contribute to an Ethiopia where locally built technology opens new possibilities.'],
                ],
            ]],
            ['principles', [
                'heading' => 'What guides our work.',
                'items' => [
                    ['icon' => 'puzzle', 'title' => 'Solve real problems', 'body' => 'Start with the people and workflows behind every challenge.'],
                    ['icon' => 'layers', 'title' => 'Build with care', 'body' => 'Make quality, usability, and reliability part of the foundation.'],
                    ['icon' => 'cpu', 'title' => 'Use AI with purpose', 'body' => 'Choose intelligent tools where they add practical value.'],
                    ['icon' => 'chartUp', 'title' => 'Grow together', 'body' => 'Listen, learn, and improve through collaboration.'],
                ],
            ]],
            ['statementBand', [
                'heading' => 'Ideas become useful when people can use them.',
                'body' => 'Our focus is practical software, thoughtful design, and continuous improvement.',
            ]],
            ['productList', [
                'heading' => "Products we're building.",
                'footnote' => 'More products are taking shape.',
                'items' => [
                    ['icon' => 'home', 'name' => 'Zemen Homes', 'description' => 'Property discovery, listings, and rental management.',
                        'linkLabel' => 'Explore Zemen Homes', 'href' => 'https://zemenhomes.com/'],
                    ['icon' => 'heart', 'name' => 'NileDating', 'description' => 'A platform for discovering people and making connections.',
                        'linkLabel' => 'Explore NileDating', 'href' => 'https://t.me/Niledatebot'],
                ],
            ]],
            ['partnerPanel', [
                'heading' => 'A partner from idea to launch.',
                'body' => 'We work with you to understand the challenge, define the right scope, and build a solution that fits.',
                'items' => [
                    ['icon' => 'messageDots', 'label' => 'Clear communication'],
                    ['icon' => 'zap', 'label' => 'Focused delivery'],
                    ['icon' => 'layers', 'label' => 'Room to grow'],
                ],
            ]],
            ['cta', [
                'style' => 'center', 'theme' => 'light',
                'heading' => "Let's create something useful.",
                'buttonLabel' => 'Talk to Paraiba', 'buttonHref' => '/contact',
            ]],
        ];
    }
}
