<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['product_page_id', 'type', 'order', 'data'])]
class ProductBlock extends Model
{
    use HasUlids;

    protected function casts(): array
    {
        return [
            'data' => 'array',
        ];
    }

    public function productPage(): BelongsTo
    {
        return $this->belongsTo(ProductPage::class);
    }
}
