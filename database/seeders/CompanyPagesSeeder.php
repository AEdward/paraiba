<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Rebuilds the Services, About and Careers pages from scratch. Safe to
 * re-run. All copy is editable afterwards in the admin page builder.
 */
class CompanyPagesSeeder extends Seeder
{
    private const TECH = [
        'python', 'javascript', 'typescript', 'php', 'dart', 'openjdk', 'kotlin',
        'swift', 'csharp', 'cplusplus', 'html5', 'css3', 'react', 'nextdotjs',
        'flutter', 'reactnative', 'laravel', 'django', 'fastapi', 'nodedotjs', 'express',
        'livewire', 'alpinedotjs', 'tailwindcss', 'vuedotjs', 'angular', 'mysql', 'postgresql',
    ];

    public function run(): void
    {
        $this->rebuild('services', 'Services', $this->services());
        $this->rebuild('about', 'About', $this->about());
        $this->rebuild('careers', 'Careers', $this->careers());
    }

    private function rebuild(string $slug, string $title, array $blocks): void
    {
        $page = Page::firstOrCreate(['slug' => $slug], ['title' => $title, 'published' => true]);

        DB::transaction(function () use ($page, $blocks) {
            $page->blocks()->delete();
            foreach ($blocks as $i => [$type, $data]) {
                $page->blocks()->create(['type' => $type, 'order' => $i + 1, 'data' => $data]);
            }
            $page->update(['published' => true]);
        });

        $this->command?->info(ucfirst($slug).' page rebuilt with '.count($blocks).' blocks.');
    }

    private function services(): array
    {
        return [
            ['pageHeader', [
                'breadcrumb' => 'Services',
                'eyebrow' => 'Services',
                'headline' => 'Technology Services for ',
                'headlineHighlight' => 'Your Next Big Move',
                'subhead' => 'From AI and custom software to web and mobile apps, we design, build, and support the technology your business runs on.',
            ]],
            ['serviceCards', [
                'eyebrow' => 'What we do',
                'heading' => 'End-to-end software services',
                'body' => 'One team from idea to launch, and beyond.',
                'items' => [
                    ['icon' => 'cpu', 'title' => 'AI & Automation',
                        'description' => 'Practical AI that saves time and improves how work gets done.',
                        'points' => ['Intelligent search and assistants', 'Document processing', 'Workflow automation']],
                    ['icon' => 'code', 'title' => 'Custom Software',
                        'description' => 'Systems built around how your business actually works.',
                        'points' => ['Business and internal tools', 'Dashboards and reporting', 'Integrations with existing systems']],
                    ['icon' => 'monitor', 'title' => 'Web Development',
                        'description' => 'Fast, secure websites and web applications.',
                        'points' => ['Company websites', 'Web platforms and portals', 'E-commerce']],
                    ['icon' => 'smartphone', 'title' => 'Mobile App Development',
                        'description' => 'Apps your customers can use anywhere.',
                        'points' => ['Android and iOS apps', 'Cross-platform apps', 'Telegram bots and mini apps']],
                    ['icon' => 'pencil', 'title' => 'Product Design',
                        'description' => 'Interfaces people understand and enjoy using.',
                        'points' => ['User research', 'UI design and prototyping', 'Design systems']],
                    ['icon' => 'cloud', 'title' => 'Cloud & Infrastructure',
                        'description' => 'Reliable hosting, deployment, and ongoing care.',
                        'points' => ['Hosting and deployment', 'Monitoring and maintenance', 'Ongoing support']],
                ],
            ]],
            ['calloutBanner', [
                'icon' => 'handshake',
                'heading' => 'Already have a system?',
                'body' => 'We can improve, extend, or rebuild existing software: adding features, fixing performance problems, and connecting it to the tools you already use.',
            ]],
            ['processSteps', [
                'heading' => 'Clarity at every step.',
                'items' => [
                    ['number' => '01', 'title' => 'Discover', 'description' => 'Understand your goals, challenges, and opportunities.'],
                    ['number' => '02', 'title' => 'Design & Build', 'description' => 'Turn ideas into a focused, high-quality solution.'],
                    ['number' => '03', 'title' => 'Launch & Improve', 'description' => 'Get to market, learn from real use, and keep making it better.'],
                ],
            ]],
            ['techStack', [
                'heading' => 'The Stack We Use',
                'body' => 'Languages, frameworks, and technologies for web, mobile, and AI.',
                'keys' => self::TECH,
            ]],
            ['cta', [
                'style' => 'strip', 'theme' => 'light',
                'heading' => 'Have a project in mind?',
                'buttonLabel' => 'Start a Project', 'buttonHref' => '/contact',
            ]],
        ];
    }

    private function about(): array
    {
        $homeProducts = optional(Page::where('slug', 'home')->first()?->blocks()->where('type', 'productsSpotlight')->first())->data['items'] ?? [];

        $blocks = [
            ['pageHeader', [
                'breadcrumb' => 'About Us',
                'eyebrow' => 'About Us',
                'headline' => 'Building Software That ',
                'headlineHighlight' => 'Works for People',
                'subhead' => 'Paraiba Technology PLC is an Ethiopian software company creating intelligent products and digital platforms for people and businesses.',
            ]],
            ['storySplit', [
                'eyebrow' => 'Who we are',
                'heading' => 'A product-minded technology company',
                'body' => "We design and build software that solves real problems, from platforms we run ourselves to custom systems for the businesses we work with.\n\nOur work brings together AI thinking, solid engineering, and thoughtful design. We focus on tools that are simple to use, reliable, and built to grow with the people who depend on them.",
                'image' => '/addis-ababa-park-sunset.webp',
                'imageAlt' => 'Addis Ababa skyline',
                'imagePosition' => 'right',
            ]],
            ['cardGrid', [
                'compact' => true, 'theme' => 'light', 'layout' => 'split', 'columns' => 2,
                'heading' => 'What we stand for.',
                'items' => [
                    ['icon' => 'target', 'title' => 'Clarity', 'description' => 'Goals, scope, and progress stay clear from the first conversation.'],
                    ['icon' => 'gem', 'title' => 'Craft', 'description' => 'We care about quality in the details people actually notice.'],
                    ['icon' => 'handshake', 'title' => 'Partnership', 'description' => 'We work alongside you long after launch day.'],
                    ['icon' => 'mapPin', 'title' => 'Local insight', 'description' => 'We build for the realities of the Ethiopian market.'],
                ],
            ]],
        ];

        if ($homeProducts) {
            $blocks[] = ['productsSpotlight', [
                'eyebrow' => 'What we have built',
                'heading' => 'Products we run ourselves.',
                'body' => 'We build and operate our own platforms, so we know what it takes to keep software working for real people.',
                'items' => $homeProducts,
            ]];
        }

        $blocks[] = ['industriesShowcase', [
            'compact' => true, 'theme' => 'dark', 'items' => [],
            'heading' => "Rooted in Ethiopia. Built for what's next.",
            'body' => 'Paraiba Technology PLC brings AI thinking, engineering, and design together to create useful digital products.',
            'photoUrl' => '/addis-ababa-park-sunset.webp',
        ]];
        $blocks[] = ['cta', [
            'style' => 'strip', 'theme' => 'light',
            'heading' => "Let's build something that matters.",
            'buttonLabel' => 'Start a Conversation', 'buttonHref' => '/contact',
        ]];

        return $blocks;
    }

    private function careers(): array
    {
        return [
            ['pageHeader', [
                'breadcrumb' => 'Careers',
                'eyebrow' => 'Careers',
                'headline' => "Build What's ",
                'headlineHighlight' => 'Next With Us',
                'subhead' => 'Join a team creating intelligent software for people and businesses in Ethiopia and beyond.',
            ]],
            ['cardGrid', [
                'compact' => true, 'theme' => 'light', 'layout' => 'split', 'columns' => 2,
                'heading' => 'Why work with us.',
                'items' => [
                    ['icon' => 'target', 'title' => 'Meaningful work', 'description' => 'Build products that people use every day.'],
                    ['icon' => 'rocket', 'title' => 'Learn and grow', 'description' => 'Work across AI, web, and mobile with room to grow.'],
                    ['icon' => 'code', 'title' => 'Modern tools', 'description' => 'Use current technologies and good engineering practice.'],
                    ['icon' => 'users', 'title' => 'Real ownership', 'description' => 'A small team with clear communication and real responsibility.'],
                ],
            ]],
            // Marks where the job board renders on /careers.
            ['openPositions', ['eyebrow' => '', 'heading' => '']],
            ['processSteps', [
                'heading' => 'How hiring works.',
                'items' => [
                    ['number' => '01', 'title' => 'Apply', 'description' => 'Choose a role and send your application and CV.'],
                    ['number' => '02', 'title' => 'Talk with us', 'description' => 'Meet the team and walk us through your experience.'],
                    ['number' => '03', 'title' => 'Join the team', 'description' => 'Receive an offer and start building with us.'],
                ],
            ]],
            ['cta', [
                'style' => 'strip', 'theme' => 'light',
                'heading' => "Don't see the right role?",
                'buttonLabel' => 'Get in Touch', 'buttonHref' => '/contact',
            ]],
        ];
    }
}
