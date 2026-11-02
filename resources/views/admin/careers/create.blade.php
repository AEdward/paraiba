@extends('layouts.admin')
@section('title', 'New job posting')
@section('content')
@include('admin.partials.nav')
<livewire:admin.careers.form />
@endsection
