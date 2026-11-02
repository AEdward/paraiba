<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

#[Fillable([
    'name', 'subdomain', 'logo_url', 'logo_disk', 'logo_path', 'logo_mime_type',
    'theme_color', 'theme_color_secondary',
])]
class ProductSite extends Model
{
    use HasUlids;

    public function pages(): HasMany
    {
        return $this->hasMany(ProductPage::class);
    }

    public function homePage(): ?ProductPage
    {
        return $this->pages()->where('slug', 'home')->first();
    }

    public function logoSrc(): ?string
    {
        if ($this->logo_path) {
            return Storage::disk($this->logo_disk ?? 'public')->url($this->logo_path);
        }

        return $this->logo_url;
    }
}
