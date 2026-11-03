@extends('layouts.admin')
@section('title', 'Edit product')
@section('content')
<livewire:admin.products.form :project="$project" />
@endsection
