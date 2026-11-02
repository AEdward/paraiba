@extends('layouts.site')
@section('title', $page->title . ' — Paraiba Technology PLC')

@section('content')
<x-block-renderer :blocks="$page->blocks" />
@endsection
