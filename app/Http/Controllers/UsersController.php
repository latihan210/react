<?php

namespace App\Http\Controllers;

use App\Actions\Fortify\CreateNewUser;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;


class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
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

        if (!in_array($sort, ['name', 'username', 'email'])) {
            $sort = 'name';
        }
        if (!in_array($direction, ['asc', 'desc'])) {
            $direction = 'asc';
        }

        $users = $query->orderBy($sort, $direction)
            ->paginate(10)
            ->withQueryString();

        return Inertia::render(
            'users/index',
            [
                'users'  => $users,
                'filter' => $request->only(['name', 'username', 'email', 'sort', 'direction']),
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
        $this->assignRole('member');

        $input = $request->all();
        $creator->create($input);

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
