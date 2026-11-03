@extends('layouts.admin')
@section('title', 'Pages')
@section('content')
<div class="mx-auto max-w-4xl px-6 py-10">
    <h1 class="text-xl font-bold mb-6">Pages</h1>
    <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table class="w-full text-sm">
            <thead class="bg-slate-50 text-left text-xs uppercase text-slate-500">
                <tr><th class="px-4 py-3">Title</th><th class="px-4 py-3">Slug</th><th class="px-4 py-3">Published</th><th class="px-4 py-3"></th></tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                @foreach (\App\Models\Page::orderBy('slug')->get() as $page)
                    <tr>
                        <td class="px-4 py-3">{{ $page->title }}</td>
                        <td class="px-4 py-3 text-slate-500">{{ $page->slug }}</td>
                        <td class="px-4 py-3">{{ $page->published ? 'Yes' : 'No' }}</td>
                        <td class="px-4 py-3 text-right">
                            <a href="{{ route('admin.pages.edit', $page) }}" class="text-slate-600 hover:text-slate-900">Edit</a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection
