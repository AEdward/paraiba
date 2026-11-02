<?php

namespace App\Models;

use App\Enums\JobApplicationStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['job_posting_id', 'name', 'email', 'phone', 'cover_letter', 'status'])]
class JobApplication extends Model
{
    use HasUlids;

    const UPDATED_AT = null;

    protected $attributes = [
        'status' => 'new',
    ];

    protected function casts(): array
    {
        return [
            'status' => JobApplicationStatus::class,
        ];
    }

    public function jobPosting(): BelongsTo
    {
        return $this->belongsTo(JobPosting::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(ApplicationDocument::class);
    }
}
