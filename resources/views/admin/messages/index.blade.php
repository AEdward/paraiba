@extends('layouts.admin')
@section('title', 'Messages')
@section('content')
@include('admin.partials.nav')
<livewire:admin.messages.index />
@endsection
