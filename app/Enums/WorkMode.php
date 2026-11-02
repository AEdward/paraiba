<?php

namespace App\Enums;

enum WorkMode: string
{
    case OnSite = 'On-site';
    case Remote = 'Remote';
    case Hybrid = 'Hybrid';
}
