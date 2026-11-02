@extends('layouts.admin')
@section('title', 'Careers')
@section('content')
@include('admin.partials.nav')
<livewire:admin.careers.index />
@endsection
