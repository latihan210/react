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
        return Inertia::render('dashboard', [
            'stats' => [
                'total_member' => User::where('username', '!=', 'masteradmin')->count(),
                'member_active' => User::where('username', '!=', 'masteradmin')->where('email_verified_at', '!=', null)->count(),
                'member_inactive' => User::where('username', '!=', 'masteradmin')->where('email_verified_at', null)->count(),
            ],
        ]);
    }
}
