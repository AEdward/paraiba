@extends('layouts.admin')
@section('title', 'Edit menu item')
@section('content')
<livewire:admin.menu.form :item="$item" />
@endsection
