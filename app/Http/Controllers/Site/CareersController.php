<?php

namespace App\Http\Controllers\Site;

use App\Enums\JobPostingStatus;
use App\Http\Controllers\Controller;
use App\Models\JobPosting;
use Illuminate\Contracts\View\View;

class CareersController extends Controller
{
    public function index(): View
    {
        return view('site.careers.index', [
            'jobs' => JobPosting::where('status', JobPostingStatus::Open)
                ->orderBy('created_at', 'desc')
                ->get(),
        ]);
    }

    public function show(JobPosting $job): View
    {
        abort_unless($job->status === JobPostingStatus::Open, 404);

        $job->increment('view_count');

        return view('site.careers.show', ['job' => $job]);
    }
}
