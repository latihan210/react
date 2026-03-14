<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

Route::redirect('/', '/login');

// Route::get('dashboard', function () {
//     return Inertia::render('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function (Request $request) {
        $query = User::where('username', '!=', 'masteradmin');

        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }
        if ($request->filled('username')) {
            $query->where('username', 'like', '%' . $request->username . '%');
        }
        if ($request->filled('email')) {
            $query->where('email', 'like', '%' . $request->email . '%');
        }

        $sort = $request->input('sort', 'name');
        $direction = $request->input('direction', 'asc');

        if (!in_array($sort, ['name', 'username', 'email'])) $sort = 'name';
        if (!in_array($direction, ['asc', 'desc'])) $direction = 'asc';

        $users = $users = $query->orderBy($sort, $direction)
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('dashboard', [
            'stats' => [
                'users'          => $users,
                'total_member'   => User::where('username', '!=', 'masteradmin')->count(),
                'filter'         => $request->only(['name', 'username', 'email', 'sort', 'direction']),
            ],
        ]);
    })->name('dashboard');
    // Route::get('members', [MembersController::class, 'index'])->name('members.index');
});

require __DIR__ . '/settings.php';
