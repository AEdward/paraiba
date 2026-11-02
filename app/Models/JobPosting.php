<?php

namespace App\Models;

use App\Enums\JobLevel;
use App\Enums\JobPostingStatus;
use App\Enums\JobType;
use App\Enums\WorkMode;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'title', 'category', 'level', 'location', 'type', 'work_mode', 'description',
    'about_role', 'responsibilities', 'nice_to_have', 'how_to_apply', 'tech_stack',
    'region', 'positions', 'min_experience_years', 'max_experience_years',
    'expires_at', 'status',
])]
class JobPosting extends Model
{
    use HasUlids;

    protected function casts(): array
    {
        return [
            'level' => JobLevel::class,
            'type' => JobType::class,
            'work_mode' => WorkMode::class,
            'status' => JobPostingStatus::class,
            'expires_at' => 'datetime',
            'positions' => 'integer',
            'min_experience_years' => 'integer',
            'max_experience_years' => 'integer',
            'view_count' => 'integer',
        ];
    }

    public function applications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }

    public function responsibilitiesList(): array
    {
        return $this->splitLines($this->responsibilities);
    }

    public function niceToHaveList(): array
    {
        return $this->splitLines($this->nice_to_have);
    }

    public function techStackList(): array
    {
        return array_filter(array_map('trim', explode(',', (string) $this->tech_stack)));
    }

    private function splitLines(?string $text): array
    {
        if (! $text) {
            return [];
        }

        return array_values(array_filter(array_map('trim', explode("\n", $text)), fn ($line) => $line !== ''));
    }
}
