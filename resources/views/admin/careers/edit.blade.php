@extends('layouts.admin')
@section('title', 'Edit job posting')
@section('content')
<livewire:admin.careers.form :posting="$posting" />
@endsection
