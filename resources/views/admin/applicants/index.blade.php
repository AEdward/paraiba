@extends('layouts.admin')
@section('title', 'Applicants')
@section('content')
@include('admin.partials.nav')
<livewire:admin.applicants.index />
@endsection
