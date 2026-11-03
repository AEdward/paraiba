<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Replaces the Solutions page's blocks with the current design. Safe to
 * re-run: it rebuilds the block list from scratch each time.
 */
class SolutionsPageSeeder extends Seeder
{
    public function run(): void
    {
        $page = Page::firstOrCreate(['slug' => 'solutions'], ['title' => 'Solutions', 'published' => true]);

        $blocks = [
            ['type' => 'pageHeader', 'data' => [
                'breadcrumb' => 'Solutions',
                'eyebrow' => 'Solutions',
                'headline' => 'Software Built for ',
                'headlineHighlight' => 'Your Industry',
                'subhead' => 'Every industry has its own challenges. We build software around yours.',
            ]],
            ['type' => 'challengeGrid', 'data' => [
                'heading' => 'The problems we help you solve',
                'challengeLabel' => 'The challenge',
                'buildLabel' => 'What we can build',
                'items' => [
                    ['icon' => 'building', 'title' => 'Real Estate & Property',
                        'challenge' => 'Scattered listings, missed enquiries, and manual rent tracking.',
                        'build' => 'Property portals, listing workflows, tenant records, and rent reminders.'],
                    ['icon' => 'stethoscope', 'title' => 'Healthcare',
                        'challenge' => 'Disconnected patient records, scheduling conflicts, and slow administrative work.',
                        'build' => 'Appointment systems, patient workflows, and operational dashboards.'],
                    ['icon' => 'graduationCap', 'title' => 'Education',
                        'challenge' => 'Fragmented student information, manual fee tracking, and poor communication.',
                        'build' => 'Student portals, learning platforms, and school administration tools.'],
                    ['icon' => 'shoppingCart', 'title' => 'Retail & Commerce',
                        'challenge' => 'Disconnected orders, stock records, and customer information.',
                        'build' => 'Online storefronts, inventory tools, and order management systems.'],
                    ['icon' => 'conciergeBell', 'title' => 'Hospitality & Services',
                        'challenge' => 'Booking errors, missed appointments, and repetitive guest communication.',
                        'build' => 'Booking platforms, service scheduling, and customer communication tools.'],
                    ['icon' => 'factory', 'title' => 'Manufacturing & Operations',
                        'challenge' => 'Limited stock visibility, paper-based processes, and disconnected reporting.',
                        'build' => 'Inventory workflows, production tracking, and management dashboards.'],
                ],
            ]],
            ['type' => 'calloutBanner', 'data' => [
                'icon' => 'sparkle',
                'heading' => 'AI where it adds value.',
                'body' => 'We can add intelligent search, document processing, support assistants, and workflow automation to suitable use cases.',
            ]],
            ['type' => 'techStack', 'data' => [
                'eyebrow' => '',
                'heading' => 'The Stack We Use',
                'body' => 'Languages, frameworks, and technologies for web, mobile, and AI.',
                'keys' => [
                    'python', 'javascript', 'typescript', 'php', 'dart', 'openjdk', 'kotlin',
                    'swift', 'csharp', 'cplusplus', 'html5', 'css3', 'react', 'nextdotjs',
                    'flutter', 'reactnative', 'laravel', 'django', 'fastapi', 'nodedotjs', 'express',
                    'livewire', 'alpinedotjs', 'tailwindcss', 'vuedotjs', 'angular', 'mysql', 'postgresql',
                ],
            ]],
            ['type' => 'cta', 'data' => [
                'style' => 'strip',
                'theme' => 'light',
                'heading' => 'Your industry. Your workflow. Your software.',
                'buttonLabel' => 'Discuss Your Requirements',
                'buttonHref' => '/contact',
            ]],
        ];

        DB::transaction(function () use ($page, $blocks) {
            $page->blocks()->delete();
            foreach ($blocks as $i => $block) {
                $page->blocks()->create(['type' => $block['type'], 'order' => $i + 1, 'data' => $block['data']]);
            }
            $page->update(['published' => true]);
        });

        $this->command?->info('Solutions page rebuilt with '.count($blocks).' blocks.');
    }
}
