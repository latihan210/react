<?php

namespace App\Http\Controllers;

use App\Actions\Fortify\CreateNewUser;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::with('roles')
            ->whereDoesntHave('roles', function ($q) {
                $q->where('name', 'admin');
            });

        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }
        if ($request->filled('username')) {
            $query->where('username', 'like', '%' . $request->username . '%');
        }
        if ($request->filled('email')) {
            $query->where('email', 'like', '%' . $request->email . '%');
        }
        if ($request->filled('roles')) {
            $query->whereHas('roles', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->roles . '%');
            });
        }

        $sort = $request->input('sort', 'name');
        $direction = $request->input('direction', 'asc');

        if (!in_array($sort, ['name', 'username', 'email', 'roles', 'created_at', 'updated_at'])) {
            $sort = 'name';
        }
        if (!in_array($direction, ['asc', 'desc'])) {
            $direction = 'asc';
        }

        $users = $query->orderBy($sort, $direction)
            ->paginate(10)
            ->withQueryString();

        $users->through(fn($user) => [
            'id'         => $user->id,
            'name'       => $user->name,
            'username'   => $user->username,
            'email'      => $user->email,
            'roles'      => $user->getRoleNames()->join(', '), // Ubah array jadi string "member, editor"
            'created_at' => $user->created_at->format('Y-m-d H:i'),
            'updated_at' => $user->updated_at->format('Y-m-d H:i'),
        ]);

        return Inertia::render(
            'users/index',
            [
                'users'  => $users,
                'filter' => $request->only(['name', 'username', 'email', 'roles', 'created_at', 'updated_at', 'sort', 'direction']),
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('register-users');

        return Inertia::render('auth/register');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, CreateNewUser $creator)
    {
        $this->authorize('register-users');

        DB::transaction(function () use ($request, $creator) {
            $user = $creator->create($request->all());
            $user->assignRole('member');
        });

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // Laravel akan mengecek UserPolicy@delete
        $this->authorize('delete', $user);

        $user->delete();

        return redirect('/')->with('success', 'Akun berhasil dihapus');
    }
}
