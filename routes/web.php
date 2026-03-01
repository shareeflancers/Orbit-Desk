<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Auth\SocialAuthController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

// Public routes
Route::get('/', fn () => Inertia::render('Home'))->name('home');
Route::get('/privacy-policy', fn () => Inertia::render('PrivacyPolicy'))->name('privacy');
Route::get('/terms-of-condition', fn () => Inertia::render('TermsOfCondition'))->name('terms');

Route::post('/contact', function (Request $request) {
    // Basic form validation
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'message' => 'required|string',
    ]);

    // Send simple text email since Mail::raw is simplest way without creating full template
    Mail::raw("Name: {$request->name}\nEmail: {$request->email}\n\nMessage:\n{$request->message}", function ($message) use ($request) {
        $message->to([config('mail.from.address'), 'shareeflancer2000@gmail.com'])
                ->subject('New Contact Inquiry from ' . $request->name)
                ->replyTo($request->email);
    });

    return back()->with('success', 'Message sent successfully!');
});

// Guest-only routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);

    Route::get('/forgot-password', [PasswordResetController::class, 'showForgot'])->name('password.request');
    Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink'])->name('password.email');

    Route::get('/reset-password/{token}', [PasswordResetController::class, 'showReset'])->name('password.reset');
    Route::post('/reset-password', [PasswordResetController::class, 'reset'])->name('password.update');

    Route::get('/auth/google', [SocialAuthController::class, 'redirectToGoogle'])->name('auth.google');
    Route::get('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback']);
});

// Auth-only routes
Route::middleware('auth')->group(function () {
    Route::get('/verify-email', [EmailVerificationController::class, 'notice'])->name('verification.notice');

    Route::get('/verify-email/{id}/{hash}', [EmailVerificationController::class, 'verify'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('/email/verification-notification', [EmailVerificationController::class, 'resend'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

});

// Protected routes (auth + verified)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');
    Route::post('/api/user/profile-pic', [\App\Http\Controllers\UserController::class, 'updateProfilePic']);
});
