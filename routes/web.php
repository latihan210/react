<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/login');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::get('users', [UsersController::class, 'index'])
        ->name('users.index');

    Route::get('register', [UsersController::class, 'create'])
        ->name('register');
    Route::post('register', [UsersController::class, 'store']);
});

require __DIR__ . '/settings.php';
