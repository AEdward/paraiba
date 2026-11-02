<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Livewire\Attributes\Computed;
use Livewire\Component;

new class extends Component
{
    public string $name = '';
    public string $email = '';
    public string $password = '';

    #[Computed]
    public function users()
    {
        return User::orderBy('created_at', 'desc')->get();
    }

    public function create(): void
    {
        $data = $this->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        User::create([
            'name' => $data['name'],
            'email' => strtolower($data['email']),
            'password' => Hash::make($data['password']),
        ]);

        $this->reset(['name', 'email', 'password']);
        unset($this->users);
    }

    public function delete(string $id): void
    {
        // Mirrors the current app's one access-control rule: can't delete self.
        if ($id === Auth::id()) {
            $this->addError('delete', "You can't delete your own account.");

            return;
        }

        User::findOrFail($id)->delete();
    }
};
?>

<div class="mx-auto max-w-3xl px-6 py-10">
    <h1 class="text-xl font-bold mb-6">Users</h1>

    @error('delete') <div class="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{{ $message }}</div> @enderror

    <div class="overflow-hidden rounded-xl border border-slate-200 bg-white mb-8">
        <table class="w-full text-sm">
            <thead class="bg-slate-50 text-left text-xs uppercase text-slate-500">
                <tr><th class="px-4 py-3">Name</th><th class="px-4 py-3">Email</th><th class="px-4 py-3"></th></tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                @foreach ($this->users as $user)
                    <tr wire:key="{{ $user->id }}">
                        <td class="px-4 py-3">{{ $user->name }}</td>
                        <td class="px-4 py-3 text-slate-500">{{ $user->email }}</td>
                        <td class="px-4 py-3 text-right">
                            @unless ($user->id === auth()->id())
                                <button wire:click="delete('{{ $user->id }}')" wire:confirm="Delete this user?" class="text-red-600 hover:text-red-800 text-xs">Delete</button>
                            @endunless
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <h2 class="font-semibold mb-3">Add user</h2>
    <form wire:submit="create" class="space-y-4 max-w-sm">
        <div>
            <input type="text" wire:model="name" placeholder="Name" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            @error('name') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
        </div>
        <div>
            <input type="email" wire:model="email" placeholder="Email" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            @error('email') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
        </div>
        <div>
            <input type="password" wire:model="password" placeholder="Password (min 8 characters)" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            @error('password') <p class="text-xs text-red-600 mt-1">{{ $message }}</p> @enderror
        </div>
        <button type="submit" class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Create user</button>
    </form>
</div>
