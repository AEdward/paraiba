@extends('layouts.admin')
@section('title', 'New product site')
@section('content')
@include('admin.partials.nav')
<livewire:admin.product-sites.form />
@endsection
