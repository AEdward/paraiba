<?php

namespace App\Enums;

enum ProjectStatus: string
{
    case Live = 'live';
    case InProgress = 'in-progress';
    case Concept = 'concept';
    case Archived = 'archived';
}
