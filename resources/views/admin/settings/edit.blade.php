@extends('layouts.admin')
@section('title', 'Settings')
@section('content')
@include('admin.partials.nav')
<livewire:admin.settings.form />
@endsection
