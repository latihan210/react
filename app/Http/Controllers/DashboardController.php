<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $memberQuery = User::whereDoesntHave('roles', fn($q) => $q->where('name', 'admin'));

        return Inertia::render('dashboard', [
            'stats' => [
                'total_member'    => (clone $memberQuery)->count(),
                'member_active'   => (clone $memberQuery)->whereNotNull('email_verified_at')->count(),
                'member_inactive' => (clone $memberQuery)->whereNull('email_verified_at')->count(),
            ]
        ]);
    }
}
