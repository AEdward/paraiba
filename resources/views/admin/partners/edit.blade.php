@extends('layouts.admin')
@section('title', 'Edit partner')
@section('content')
@include('admin.partials.nav')
<livewire:admin.partners.form :partner="$partner" />
@endsection
