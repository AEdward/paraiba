@extends('layouts.admin')
@section('title', 'Product Sites')
@section('content')
@include('admin.partials.nav')
<livewire:admin.product-sites.index />
@endsection
