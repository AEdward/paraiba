@extends('layouts.admin')
@section('title', 'Edit product')
@section('content')
@include('admin.partials.nav')
<livewire:admin.products.form :project="$project" />
@endsection
