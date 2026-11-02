<nav class="border-b border-slate-200 bg-white">
    <div class="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-5 text-sm font-medium text-slate-600">
            <a href="{{ route('admin.dashboard') }}" class="font-bold text-slate-900">Portal</a>
            @if (Route::has('admin.pages.index'))<a href="{{ route('admin.pages.index') }}" class="hover:text-slate-900">Pages</a>@endif
            <a href="{{ route('admin.menu.index') }}" class="hover:text-slate-900">Menu</a>
            <a href="{{ route('admin.products.index') }}" class="hover:text-slate-900">Products</a>
            @if (Route::has('admin.product-sites.index'))<a href="{{ route('admin.product-sites.index') }}" class="hover:text-slate-900">Product Sites</a>@endif
            <a href="{{ route('admin.partners.index') }}" class="hover:text-slate-900">Partners</a>
            <a href="{{ route('admin.careers.index') }}" class="hover:text-slate-900">Careers</a>
            <a href="{{ route('admin.applicants.index') }}" class="hover:text-slate-900">Applicants</a>
            <a href="{{ route('admin.messages.index') }}" class="hover:text-slate-900">Messages</a>
            <a href="{{ route('admin.settings.edit') }}" class="hover:text-slate-900">Settings</a>
            <a href="{{ route('admin.users.index') }}" class="hover:text-slate-900">Users</a>
        </div>
        <form method="POST" action="{{ route('admin.logout') }}">
            @csrf
            <button type="submit" class="text-sm text-slate-500 hover:text-slate-900">Log out</button>
        </form>
    </div>
</nav>
