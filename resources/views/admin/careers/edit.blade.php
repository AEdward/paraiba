@extends('layouts.admin')
@section('title', 'Edit job posting')
@section('content')
@include('admin.partials.nav')
<livewire:admin.careers.form :posting="$posting" />
@endsection
