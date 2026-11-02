<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'email', 'message', 'read'])]
class ContactSubmission extends Model
{
    use HasUlids;

    const UPDATED_AT = null;

    protected function casts(): array
    {
        return [
            'read' => 'boolean',
        ];
    }
}
