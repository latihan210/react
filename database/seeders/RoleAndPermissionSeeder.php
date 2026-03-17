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
        // Permission
        $p1 = Permission::firstOrCreate(['name' => 'manage users']);
        $p2 = Permission::firstOrCreate(['name' => 'delete account']);

        // Role Admin
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->givePermissionTo($p1);

        // Role Member
        $member = Role::firstOrCreate(['name' => 'member']);
        $member->givePermissionTo($p2);
    }
}
