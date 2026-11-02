@extends('layouts.admin')
@section('title', 'Edit menu item')
@section('content')
@include('admin.partials.nav')
<livewire:admin.menu.form :item="$item" />
@endsection
