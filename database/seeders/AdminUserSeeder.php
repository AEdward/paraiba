<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Mirrors prisma/seed.ts's idempotent admin-creation behavior: skip if
     * a user with this email already exists.
     */
    public function run(): void
    {
        $email = strtolower((string) env('ADMIN_EMAIL'));
        $name = env('ADMIN_NAME', 'Admin');
        $password = env('ADMIN_PASSWORD');

        if (! $email || ! $password) {
            $this->command->warn('ADMIN_EMAIL/ADMIN_PASSWORD not set — skipping admin seed.');

            return;
        }

        if (User::where('email', $email)->exists()) {
            $this->command->info("Admin user {$email} already exists — skipping.");

            return;
        }

        User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
        ]);

        $this->command->info("Created admin user {$email}.");
    }
}
