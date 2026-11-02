<?php

namespace App\Enums;

enum NavLocation: string
{
    case Header = 'header';
    case Footer = 'footer';
    case Both = 'both';
}
