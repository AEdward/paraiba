@extends('layouts.admin')
@section('title', 'Edit: '.$site->name)
@section('content')
<livewire:admin.product-sites.form :site="$site" />

<div class="mx-auto max-w-xl px-6 pb-10">
    <h2 class="text-lg font-bold mb-4">Home page blocks</h2>
    @php($homePage = $site->homePage() ?? $site->pages()->create(['slug' => 'home', 'title' => 'Home']))
    <livewire:admin.blocks.block-list owner-type="product_page" :owner-id="$homePage->id" />
</div>
@endsection
