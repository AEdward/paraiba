@extends('layouts.admin')
@section('title', 'New product')
@section('content')
@include('admin.partials.nav')
<livewire:admin.products.form />
@endsection
