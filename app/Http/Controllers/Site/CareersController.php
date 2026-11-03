<?php

namespace App\Http\Controllers\Site;

use App\Enums\JobPostingStatus;
use App\Http\Controllers\Controller;
use App\Models\JobPosting;
use App\Models\Page;
use Illuminate\Contracts\View\View;

class CareersController extends Controller
{
    /**
     * The "careers" CMS Page's non-live blocks (hero/intro text etc) render
     * above the live, fully-filterable job board — combining what the old
     * app split between a Page's openPositions block and the JobBoard
     * component it embedded.
     */
    public function index(): View
    {
        $page = Page::where('slug', 'careers')->where('published', true)->first();
        $blocks = ($page?->blocks ?? collect())->sortBy('order')->values();

        // The openPositions block marks where the job board goes; sections
        // before it render above the board and sections after it below.
        $split = $blocks->search(fn ($block) => $block->type === 'openPositions');

        return view('site.careers.index', [
            'introBlocks' => $split === false ? $blocks : $blocks->slice(0, $split),
            'outroBlocks' => $split === false ? collect() : $blocks->slice($split + 1),
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
