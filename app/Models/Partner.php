<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

#[Fillable(['name', 'logo_url', 'logo_disk', 'logo_path', 'logo_mime_type', 'website', 'order'])]
class Partner extends Model
{
    use HasUlids;

    protected function casts(): array
    {
        return [
            'order' => 'integer',
        ];
    }

    public function logoSrc(): ?string
    {
        if ($this->logo_path) {
            return Storage::disk($this->logo_disk ?? 'public')->url($this->logo_path);
        }

        return $this->logo_url;
    }
}
