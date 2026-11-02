@extends('layouts.admin')
@section('title', 'Users')
@section('content')
@include('admin.partials.nav')
<livewire:admin.users.index />
@endsection
