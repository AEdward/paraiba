<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

#[Fillable(['disk', 'path', 'mime_type'])]
class MediaAsset extends Model
{
    use HasUlids;

    const UPDATED_AT = null;

    public function url(): string
    {
        return Storage::disk($this->disk)->url($this->path);
    }
}
