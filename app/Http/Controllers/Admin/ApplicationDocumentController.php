<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ApplicationDocument;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ApplicationDocumentController extends Controller
{
    /**
     * Equivalent to /api/admin/documents/[id] — the one media route that
     * requires admin auth, since application documents are private.
     * Gated by the `auth` middleware on the route definition.
     */
    public function show(ApplicationDocument $document): StreamedResponse
    {
        return Storage::disk($document->disk)->response($document->path, $document->file_name, [
            'Content-Type' => $document->mime_type,
        ]);
    }
}
