<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;

/**
 * Shared helper for the dual-source pattern used throughout the admin:
 * a nullable URL string field OR an uploaded file (binary takes priority
 * when present), with a "remove" checkbox clearing back to URL-only.
 */
trait HandlesUploads
{
    /**
     * @return array{disk: string, path: string, mime_type: string}
     */
    protected function storeUpload(UploadedFile $file, string $directory): array
    {
        $path = $file->store($directory, 'public');

        return [
            'disk' => 'public',
            'path' => $path,
            'mime_type' => $file->getMimeType(),
        ];
    }
}
