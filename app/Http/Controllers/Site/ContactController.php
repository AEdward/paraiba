<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function show(Request $request): View
    {
        return view('site.contact', [
            'role' => $request->query('role'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'message' => ['required', 'string'],
        ]);

        ContactSubmission::create($data);

        return back()->with('status', "Thanks — we'll be in touch.");
    }
}
