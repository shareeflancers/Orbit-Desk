<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
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
