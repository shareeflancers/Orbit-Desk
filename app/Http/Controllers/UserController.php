<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = \App\Models\User::query();

        if ($request->boolean('with_deleted')) {
            $query->withTrashed();
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->latest()->paginate($request->get('per_page', 10));

        return inertia('admin/Users', [
            'users' => $users,
            'filters' => $request->only(['search', 'per_page', 'with_deleted']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string|in:admin,user',
            'is_active' => 'boolean'
        ]);

        $validated['password'] = \Illuminate\Support\Facades\Hash::make($validated['password']);
        $validated['is_active'] = $request->boolean('is_active');

        \App\Models\User::create($validated);

        return redirect()->back()->with('success', 'User created successfully.');
    }

    public function update(Request $request, \App\Models\User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|string|in:admin,user',
            'is_active' => 'boolean'
        ]);

        if ($request->filled('password')) {
            $request->validate(['password' => 'string|min:8']);
            $validated['password'] = \Illuminate\Support\Facades\Hash::make($request->password);
        }
        
        $validated['is_active'] = $request->boolean('is_active');

        $user->update($validated);

        return redirect()->back()->with('success', 'User updated successfully.');
    }

    public function destroy(\App\Models\User $user)
    {
        if (auth()->id() === $user->id) {
            return redirect()->back()->with('error', 'You cannot delete yourself.');
        }

        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully.');
    }

    public function toggleActive(\App\Models\User $user)
    {
        if (auth()->id() === $user->id) {
            return redirect()->back()->with('error', 'You cannot deactivate yourself.');
        }

        $user->update(['is_active' => !$user->is_active]);

        return redirect()->back()->with('success', 'User status updated successfully.');
    }
    
    public function updateRole(Request $request, \App\Models\User $user)
    {
        if (auth()->id() === $user->id) {
            return redirect()->back()->with('error', 'You cannot change your own role.');
        }
        
        $validated = $request->validate([
            'role' => 'required|string|in:admin,user',
        ]);
        
        $user->update(['role' => $validated['role']]);
        
        return redirect()->back()->with('success', 'User role updated successfully.');
    }

    public function updateProfilePic(Request $request)
    {
        $request->validate([
            'profile_pic' => ['required', 'image', 'mimes:jpeg,png,jpg,gif', 'max:5120'], // Max 5MB
        ]);

        $user = $request->user();

        if ($request->hasFile('profile_pic')) {
            // Delete old picture if exists and is stored locally
            if ($user->profile_pic && str_starts_with($user->profile_pic, 'profile_pics/')) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($user->profile_pic);
            }

            // Save new picture
            $path = $request->file('profile_pic')->store('profile_pics', 'public');
            
            $user->update([
                'profile_pic' => $path,
            ]);
        }

        return redirect()->back()->with('status', 'Profile picture updated successfully.');
    }
}
