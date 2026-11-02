@extends('layouts.admin')
@section('title', 'New partner')
@section('content')
@include('admin.partials.nav')
<livewire:admin.partners.form />
@endsection
