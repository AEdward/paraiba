@extends('layouts.admin')
@section('title', 'Menu')
@section('content')
@include('admin.partials.nav')
<livewire:admin.menu.index />
@endsection
