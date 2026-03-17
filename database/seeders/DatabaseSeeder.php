<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleAndPermissionSeeder::class,
        ]);

        $admin = \App\Models\User::create([
            'name' => 'Yosep Solahudin',
            'username' => 'masteradmin',
            'email' => 'yosepsolahudin200@gmail.com',
            'password' => Hash::make('21042002'),
            'email_verified_at' => now(),
        ]);

        $admin->assignRole('admin');

        \App\Models\User::factory(100)->create()->each(function ($user) {
            $user->assignRole('member');
        });
    }
}
