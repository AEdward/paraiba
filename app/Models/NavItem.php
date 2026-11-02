<?php

namespace App\Models;

use App\Enums\NavLocation;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['label', 'href', 'location', 'group', 'order', 'new_tab'])]
class NavItem extends Model
{
    use HasUlids;

    protected function casts(): array
    {
        return [
            'location' => NavLocation::class,
            'order' => 'integer',
            'new_tab' => 'boolean',
        ];
    }
}
