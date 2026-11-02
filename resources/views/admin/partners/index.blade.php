@extends('layouts.admin')
@section('title', 'Partners')
@section('content')
@include('admin.partials.nav')
<livewire:admin.partners.index />
@endsection
