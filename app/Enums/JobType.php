<?php

namespace App\Enums;

enum JobType: string
{
    case FullTime = 'Full-time';
    case PartTime = 'Part-time';
    case Contract = 'Contract';
}
