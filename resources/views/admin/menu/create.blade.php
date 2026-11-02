@extends('layouts.admin')
@section('title', 'New menu item')
@section('content')
@include('admin.partials.nav')
<livewire:admin.menu.form />
@endsection
