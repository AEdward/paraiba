<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['product_site_id', 'slug', 'title'])]
class ProductPage extends Model
{
    use HasUlids;

    public function productSite(): BelongsTo
    {
        return $this->belongsTo(ProductSite::class);
    }

    public function blocks(): HasMany
    {
        return $this->hasMany(ProductBlock::class)->orderBy('order');
    }
}
