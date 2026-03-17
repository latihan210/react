<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'manage users']); // Admin bisa lihat/tambah user
        Permission::create(['name' => 'delete account']); // Member bisa hapus akun sendiri

        // 2. Buat Role Admin
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo('manage users');

        // 3. Buat Role Member
        $member = Role::create(['name' => 'member']);
        $member->givePermissionTo('delete account');
    }
}
