@extends('layouts.admin')
@section('title', 'Edit partner')
@section('content')
<livewire:admin.partners.form :partner="$partner" />
@endsection
