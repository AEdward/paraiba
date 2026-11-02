<?php

namespace App\Enums;

enum JobApplicationStatus: string
{
    case New = 'new';
    case Reviewed = 'reviewed';
    case Shortlisted = 'shortlisted';
    case Rejected = 'rejected';
    case Hired = 'hired';
}
