@extends('layouts.admin')
@section('title', 'Edit: '.$page->title)
@section('content')
<div class="mx-auto max-w-3xl px-6 py-10">
    <div class="flex items-center justify-between mb-6">
        <h1 class="text-xl font-bold">{{ $page->title }} <span class="text-slate-400 font-normal text-sm">/{{ $page->slug }}</span></h1>
        <livewire:admin.pages.publish-toggle :page="$page" />
    </div>
    <livewire:admin.blocks.block-list owner-type="page" :owner-id="$page->id" />
</div>
@endsection
