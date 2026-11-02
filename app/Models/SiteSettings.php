<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'office_location', 'phone', 'email', 'map_embed_url', 'facebook_url',
    'instagram_url', 'tiktok_url', 'telegram_url', 'youtube_url', 'linkedin_url',
])]
class SiteSettings extends Model
{
    protected $table = 'site_settings';

    public $incrementing = false;

    protected $keyType = 'string';

    const UPDATED_AT = 'updated_at';

    const CREATED_AT = null;

    public static function current(): self
    {
        $model = self::find('singleton') ?? new self();
        $model->id = 'singleton';

        return $model;
    }
}
