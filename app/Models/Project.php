<?php

namespace App\Models;

use App\Enums\ProjectStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

#[Fillable([
    'slug', 'name', 'tagline', 'description', 'status', 'tags', 'link',
    'screenshot_url', 'screenshot_disk', 'screenshot_path', 'screenshot_mime_type',
    'embed_live', 'github_repo', 'featured', 'deliverables', 'case_study',
])]
class Project extends Model
{
    use HasUlids;

    protected $attributes = [
        'status' => 'concept',
        'tags' => '',
        'embed_live' => false,
        'featured' => false,
    ];

    protected function casts(): array
    {
        return [
            'status' => ProjectStatus::class,
            'embed_live' => 'boolean',
            'featured' => 'boolean',
        ];
    }

    /**
     * Uploaded binary takes priority over the plain URL field, matching the
     * dual-source pattern used for every logo/screenshot field in this app.
     */
    public function screenshotSrc(): ?string
    {
        if ($this->screenshot_path) {
            return Storage::disk($this->screenshot_disk ?? 'public')->url($this->screenshot_path);
        }

        return $this->screenshot_url;
    }

    public function tagList(): array
    {
        return array_filter(array_map('trim', explode(',', (string) $this->tags)));
    }
}
