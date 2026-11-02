<?php

namespace App\Console\Commands;

use App\Models\ApplicationDocument;
use App\Models\Block;
use App\Models\ContactSubmission;
use App\Models\JobApplication;
use App\Models\JobPosting;
use App\Models\NavItem;
use App\Models\Page;
use App\Models\Partner;
use App\Models\Project;
use App\Models\SiteSettings;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * One-off Postgres (Supabase, the old Next.js/Prisma app) -> MySQL import.
 *
 * Not a dump/restore: primary keys move from Prisma's cuid() to ULID, and
 * binary columns (Bytes in the old schema) move from in-DB blobs to
 * Storage-backed path columns. A legacy_id_map table records old-cuid ->
 * new-ulid per table, both so child-row foreign keys can be rewritten
 * correctly and so this command is safe to re-run (already-migrated rows
 * are skipped).
 *
 * Scope note (user decision 2026-11-02): ProductSite/ProductPage/
 * ProductBlock are intentionally NOT migrated — the subdomain/product-site
 * infrastructure stays, but the old Yeneta/Tena/Mead/Kinin/Enegeda content
 * itself isn't worth porting.
 */
class MigrateFromLegacy extends Command
{
    protected $signature = 'migrate:from-legacy {--dry-run : Report counts without writing anything}';

    protected $description = 'Import data from the old Next.js/Prisma Postgres database into this MySQL schema';

    public function handle(): int
    {
        $dryRun = (bool) $this->option('dry-run');

        if (! config('database.connections.legacy_pgsql.url') && ! env('LEGACY_DB_DATABASE')) {
            $this->error('Set LEGACY_DATABASE_URL (or LEGACY_DB_* vars) in .env before running this command.');

            return self::FAILURE;
        }

        try {
            DB::connection('legacy_pgsql')->getPdo();
        } catch (\Throwable $e) {
            $this->error('Could not connect to legacy_pgsql: '.$e->getMessage());

            return self::FAILURE;
        }

        $this->info($dryRun ? 'Dry run — no writes will happen.' : 'Migrating…');

        // Dependency order: parents before children.
        $this->migrateUsers($dryRun);
        $this->migrateProjects($dryRun);
        $this->migratePartners($dryRun);
        $this->migratePagesAndBlocks($dryRun);
        $this->migrateContactSubmissions($dryRun);
        $this->migrateSiteSettings($dryRun);
        $this->migrateNavItems($dryRun);
        $this->migrateJobPostingsAndApplications($dryRun);

        $this->info('Done.');

        return self::SUCCESS;
    }

    // --- ID mapping -----------------------------------------------------

    protected function alreadyMigrated(string $table, string $oldId): ?string
    {
        return DB::table('legacy_id_map')->where(['table_name' => $table, 'old_id' => $oldId])->value('new_id');
    }

    protected function remember(string $table, string $oldId, string $newId): void
    {
        DB::table('legacy_id_map')->insert([
            'table_name' => $table, 'old_id' => $oldId, 'new_id' => $newId,
            'created_at' => now(), 'updated_at' => now(),
        ]);
    }

    protected function mapped(string $table, string $oldId): ?string
    {
        return $this->alreadyMigrated($table, $oldId);
    }

    // --- Binary columns ---------------------------------------------------

    /**
     * Postgres bytea columns can come back as a stream resource or a raw
     * binary string depending on PDO driver behavior — handle both.
     */
    protected function readBytes(mixed $value): ?string
    {
        if ($value === null) {
            return null;
        }

        return is_resource($value) ? stream_get_contents($value) : $value;
    }

    protected function storeBytes(?string $bytes, string $directory): ?array
    {
        if ($bytes === null || $bytes === '') {
            return null;
        }

        $finfo = new \finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->buffer($bytes) ?: 'application/octet-stream';
        $ext = str_contains($mime, '/') ? explode('/', $mime)[1] : 'bin';
        $path = $directory.'/'.Str::ulid().'.'.$ext;

        Storage::disk('public')->put($path, $bytes);

        return ['disk' => 'public', 'path' => $path, 'mime_type' => $mime];
    }

    protected function storePrivateBytes(?string $bytes, string $directory, string $extHint): ?array
    {
        if ($bytes === null || $bytes === '') {
            return null;
        }

        $path = $directory.'/'.Str::ulid().'.'.$extHint;
        Storage::disk('private')->put($path, $bytes);

        return ['disk' => 'private', 'path' => $path];
    }

    // --- Rich text conversion ---------------------------------------------

    /**
     * Minimal ProseMirror/Tiptap doc JSON -> HTML walker, covering the
     * node types the old richText block's restricted toolbar could
     * produce: paragraph, heading(level 3), bulletList/orderedList/
     * listItem, text with bold/italic marks.
     */
    protected function tiptapToHtml(mixed $doc): string
    {
        if (is_string($doc)) {
            $decoded = json_decode($doc, true);
            $doc = is_array($decoded) ? $decoded : null;
        }

        if (! is_array($doc) || empty($doc['content'])) {
            return '';
        }

        return collect($doc['content'])->map(fn ($node) => $this->renderTiptapNode($node))->implode('');
    }

    protected function renderTiptapNode(array $node): string
    {
        $type = $node['type'] ?? null;
        $content = $node['content'] ?? [];

        $inner = fn () => collect($content)->map(fn ($n) => $this->renderTiptapNode($n))->implode('');

        return match ($type) {
            'paragraph' => '<p>'.$inner().'</p>',
            'heading' => '<h'.($node['attrs']['level'] ?? 3).'>'.$inner().'</h'.($node['attrs']['level'] ?? 3).'>',
            'bulletList' => '<ul>'.$inner().'</ul>',
            'orderedList' => '<ol>'.$inner().'</ol>',
            'listItem' => '<li>'.$inner().'</li>',
            'text' => $this->renderTiptapText($node),
            default => $inner(),
        };
    }

    protected function renderTiptapText(array $node): string
    {
        $text = e($node['text'] ?? '');

        foreach ($node['marks'] ?? [] as $mark) {
            $text = match ($mark['type'] ?? null) {
                'bold' => "<strong>{$text}</strong>",
                'italic' => "<em>{$text}</em>",
                default => $text,
            };
        }

        return $text;
    }

    // --- Per-model migration ----------------------------------------------

    protected function migrateUsers(bool $dryRun): void
    {
        $rows = DB::connection('legacy_pgsql')->table('User')->get();
        $this->info("User: {$rows->count()} rows");

        if ($dryRun) {
            return;
        }

        foreach ($rows as $row) {
            if ($this->mapped('users', $row->id)) {
                continue;
            }

            DB::transaction(function () use ($row) {
                $user = User::create([
                    'name' => $row->name,
                    'email' => $row->email,
                    'password' => $row->passwordHash,
                ]);
                // User::password has a 'hashed' cast, which re-hashes whatever
                // it's given - but this value is already a bcrypt hash, so
                // create() above just double-hashed it. Overwrite via a raw
                // query to bypass the cast and store the real hash as-is.
                DB::table('users')->where('id', $user->id)->update(['password' => $row->passwordHash]);
                $user->forceFill(['created_at' => $row->createdAt])->save();
                $this->remember('users', $row->id, $user->id);
            });
        }
    }

    protected function migrateProjects(bool $dryRun): void
    {
        $rows = DB::connection('legacy_pgsql')->table('Project')->get();
        $this->info("Project: {$rows->count()} rows");

        if ($dryRun) {
            return;
        }

        foreach ($rows as $row) {
            if ($this->mapped('projects', $row->id)) {
                continue;
            }

            DB::transaction(function () use ($row) {
                $screenshot = $this->storeBytes($this->readBytes($row->screenshotData ?? null), 'screenshots');

                $project = Project::create([
                    'slug' => $row->slug,
                    'name' => $row->name,
                    'tagline' => $row->tagline,
                    'description' => $row->description,
                    'status' => $row->status,
                    'tags' => $row->tags,
                    'link' => $row->link,
                    'screenshot_url' => $row->screenshot,
                    'screenshot_disk' => $screenshot['disk'] ?? null,
                    'screenshot_path' => $screenshot['path'] ?? null,
                    'screenshot_mime_type' => $screenshot['mime_type'] ?? $row->screenshotMimeType,
                    'embed_live' => (bool) $row->embedLive,
                    'github_repo' => $row->githubRepo,
                    'featured' => (bool) $row->featured,
                    'deliverables' => $row->deliverables,
                    'case_study' => $row->caseStudy,
                ]);
                $this->remember('projects', $row->id, $project->id);
            });
        }
    }

    protected function migratePartners(bool $dryRun): void
    {
        $rows = DB::connection('legacy_pgsql')->table('Partner')->get();
        $this->info("Partner: {$rows->count()} rows");

        if ($dryRun) {
            return;
        }

        foreach ($rows as $row) {
            if ($this->mapped('partners', $row->id)) {
                continue;
            }

            DB::transaction(function () use ($row) {
                $logo = $this->storeBytes($this->readBytes($row->logoData ?? null), 'logos');

                $partner = Partner::create([
                    'name' => $row->name,
                    'logo_url' => $row->logoUrl,
                    'logo_disk' => $logo['disk'] ?? null,
                    'logo_path' => $logo['path'] ?? null,
                    'logo_mime_type' => $logo['mime_type'] ?? $row->logoMimeType,
                    'website' => $row->website,
                    'order' => $row->order,
                ]);
                $this->remember('partners', $row->id, $partner->id);
            });
        }
    }

    protected function migratePagesAndBlocks(bool $dryRun): void
    {
        $pages = DB::connection('legacy_pgsql')->table('Page')->get();
        $blocks = DB::connection('legacy_pgsql')->table('Block')->get();
        $this->info("Page: {$pages->count()} rows, Block: {$blocks->count()} rows");

        if ($dryRun) {
            return;
        }

        foreach ($pages as $row) {
            if ($this->mapped('pages', $row->id)) {
                continue;
            }

            // Pages use fixed slugs seeded by PageSeeder — reuse the
            // existing row for that slug rather than creating a duplicate.
            $page = Page::where('slug', $row->slug)->first() ?? Page::create([
                'slug' => $row->slug,
                'title' => $row->title,
                'published' => (bool) $row->published,
            ]);
            $page->update(['title' => $row->title, 'published' => (bool) $row->published]);
            $this->remember('pages', $row->id, $page->id);
        }

        foreach ($blocks as $row) {
            if ($this->mapped('blocks', $row->id)) {
                continue;
            }

            $newPageId = $this->mapped('pages', $row->pageId);
            if (! $newPageId) {
                continue;
            }

            $data = json_decode($row->data, true) ?? [];

            if ($row->type === 'richText' && isset($data['body'])) {
                $data['body'] = $this->tiptapToHtml($data['body']);
            }

            $block = Block::create([
                'page_id' => $newPageId,
                'type' => $row->type,
                'order' => $row->order,
                'data' => $data,
            ]);
            $this->remember('blocks', $row->id, $block->id);
        }
    }

    protected function migrateContactSubmissions(bool $dryRun): void
    {
        $rows = DB::connection('legacy_pgsql')->table('ContactSubmission')->get();
        $this->info("ContactSubmission: {$rows->count()} rows");

        if ($dryRun) {
            return;
        }

        foreach ($rows as $row) {
            if ($this->mapped('contact_submissions', $row->id)) {
                continue;
            }

            $submission = ContactSubmission::create([
                'name' => $row->name,
                'email' => $row->email,
                'message' => $row->message,
                'read' => (bool) $row->read,
            ]);
            $this->remember('contact_submissions', $row->id, $submission->id);
        }
    }

    protected function migrateSiteSettings(bool $dryRun): void
    {
        $row = DB::connection('legacy_pgsql')->table('SiteSettings')->first();
        $this->info($row ? 'SiteSettings: 1 row' : 'SiteSettings: none');

        if ($dryRun || ! $row) {
            return;
        }

        $settings = SiteSettings::current();
        $settings->fill([
            'office_location' => $row->officeLocation,
            'phone' => $row->phone,
            'email' => $row->email,
            'map_embed_url' => $row->mapEmbedUrl,
            'facebook_url' => $row->facebookUrl,
            'instagram_url' => $row->instagramUrl,
            'tiktok_url' => $row->tiktokUrl,
            'telegram_url' => $row->telegramUrl,
            'youtube_url' => $row->youtubeUrl,
            'linkedin_url' => $row->linkedinUrl,
        ])->save();
    }

    protected function migrateNavItems(bool $dryRun): void
    {
        $rows = DB::connection('legacy_pgsql')->table('NavItem')->get();
        $this->info("NavItem: {$rows->count()} rows");

        if ($dryRun) {
            return;
        }

        foreach ($rows as $row) {
            if ($this->mapped('nav_items', $row->id)) {
                continue;
            }

            $item = NavItem::create([
                'label' => $row->label,
                'href' => $row->href,
                'location' => $row->location,
                'group' => $row->group,
                'order' => $row->order,
                'new_tab' => (bool) $row->newTab,
            ]);
            $this->remember('nav_items', $row->id, $item->id);
        }
    }

    protected function migrateJobPostingsAndApplications(bool $dryRun): void
    {
        $postings = DB::connection('legacy_pgsql')->table('JobPosting')->get();
        $applications = DB::connection('legacy_pgsql')->table('JobApplication')->get();
        $documents = DB::connection('legacy_pgsql')->table('ApplicationDocument')->get();
        $this->info("JobPosting: {$postings->count()}, JobApplication: {$applications->count()}, ApplicationDocument: {$documents->count()}");

        if ($dryRun) {
            return;
        }

        foreach ($postings as $row) {
            if ($this->mapped('job_postings', $row->id)) {
                continue;
            }

            $posting = JobPosting::create([
                'title' => $row->title,
                'category' => $row->category,
                'level' => $row->level,
                'location' => $row->location,
                'type' => $row->type,
                'work_mode' => $row->workMode,
                'description' => $row->description,
                'about_role' => $row->aboutRole,
                'responsibilities' => $row->responsibilities,
                'nice_to_have' => $row->niceToHave,
                'how_to_apply' => $row->howToApply,
                'tech_stack' => $row->techStack,
                'region' => $row->region,
                'positions' => $row->positions,
                'min_experience_years' => $row->minExperienceYears,
                'max_experience_years' => $row->maxExperienceYears,
                'expires_at' => $row->expiresAt,
                'status' => $row->status,
            ]);
            $posting->forceFill(['view_count' => $row->viewCount])->save();
            $this->remember('job_postings', $row->id, $posting->id);
        }

        foreach ($applications as $row) {
            if ($this->mapped('job_applications', $row->id)) {
                continue;
            }

            $newJobId = $this->mapped('job_postings', $row->jobId);
            if (! $newJobId) {
                continue;
            }

            $application = JobApplication::create([
                'job_posting_id' => $newJobId,
                'name' => $row->name,
                'email' => $row->email,
                'phone' => $row->phone,
                'cover_letter' => $row->coverLetter,
                'status' => $row->status,
            ]);
            $this->remember('job_applications', $row->id, $application->id);
        }

        foreach ($documents as $row) {
            if ($this->mapped('application_documents', $row->id)) {
                continue;
            }

            $newApplicationId = $this->mapped('job_applications', $row->jobApplicationId);
            if (! $newApplicationId) {
                continue;
            }

            $ext = pathinfo($row->fileName, PATHINFO_EXTENSION) ?: 'bin';
            $stored = $this->storePrivateBytes($this->readBytes($row->data), 'applications', $ext);

            if (! $stored) {
                continue;
            }

            $document = ApplicationDocument::create([
                'job_application_id' => $newApplicationId,
                'file_name' => $row->fileName,
                'mime_type' => $row->mimeType,
                'disk' => $stored['disk'],
                'path' => $stored['path'],
            ]);
            $this->remember('application_documents', $row->id, $document->id);
        }
    }
}
