@extends('layouts.admin')
@section('title', 'Products')
@section('content')
@include('admin.partials.nav')
<livewire:admin.products.index />
@endsection
