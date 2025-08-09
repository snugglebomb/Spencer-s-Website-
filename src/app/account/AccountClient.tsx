'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, ReactNode, FormEvent } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AccountClient({ userEmail, userName }: { userEmail?: string; userName?: string|null }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  // If session is loading, avoid layout shift
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-gray-300">
        <div className="animate-pulse">Loading your account…</div>
      </div>
    );
  }

  // If NOT signed in, show a focused sign-in CTA
  if (!session) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl border border-emerald-400/20 bg-neutral-900/70 p-8 shadow-[0_0_0_1px_rgba(16,185,129,0.08)]">
          <h1 className="text-3xl font-extrabold text-center mb-3 bg-gradient-to-r from-emerald-300 to-emerald-100 bg-clip-text text-transparent">Account</h1>
          <p className="text-center text-gray-300 mb-6">Sign in with your GMU account to access your profile, posts, events, and marketplace tools.</p>
          <button
            onClick={() => signIn()}
            className="w-full nav-pill py-3 text-emerald-300 hover:text-emerald-200 font-semibold"
          >
            Sign in
          </button>
          <div className="mt-4 text-center text-sm text-gray-400">
            By continuing you agree to our
            {" "}
            <Link href="/terms" className="text-emerald-300 hover:text-emerald-200 underline underline-offset-2">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-emerald-300 hover:text-emerald-200 underline underline-offset-2">Privacy</Link>.
          </div>
        </div>
      </div>
    );
  }

  // Signed-in view
  const name = session.user?.name ?? userName ?? "Patriot";
  const email = session.user?.email ?? userEmail ?? "unknown@gmu.edu";
  const initial = (name?.[0] || 'G').toUpperCase();

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-emerald-300 to-emerald-100 bg-clip-text text-transparent">Your Account</h1>
        <p className="text-center text-gray-400">Manage your profile, activity, and settings</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-20 grid gap-8 md:grid-cols-3">
        {/* Profile Card */}
        <div className="md:col-span-1 rounded-3xl border border-emerald-400/25 bg-neutral-900/70 p-6 shadow-[0_0_0_1px_rgba(16,185,129,0.08)]">
          <div className="w-16 h-16 rounded-2xl bg-neutral-800 flex items-center justify-center text-2xl font-bold text-emerald-300 mb-4">
            {initial}
          </div>
          <div className="space-y-1">
            <div className="text-xl font-semibold text-white">{name}</div>
            <div className="text-sm text-gray-300">{email}</div>
          </div>
          <button
            onClick={() => signOut()}
            className="mt-6 w-full nav-pill py-2.5 text-emerald-300 hover:text-emerald-200 font-semibold"
          >
            Sign out
          </button>
        </div>

        {/* Stats + Shortcuts */}
        <div className="md:col-span-2 grid gap-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { label: 'Posts', value: 0 },
              { label: 'Events', value: 0 },
              { label: 'Items Sold', value: 0 },
              { label: 'Items Bought', value: 0 },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-emerald-400/25 bg-neutral-900/70 p-4 text-center">
                <div className="text-2xl font-bold text-emerald-300">{s.value}</div>
                <div className="text-sm text-gray-300">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-emerald-400/25 bg-neutral-900/70 p-6">
              <h2 className="text-lg font-semibold mb-3 text-white">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/feed" className="nav-pill py-2 text-center text-emerald-300 hover:text-emerald-200 font-semibold">View Feed</Link>
                <Link href="/events" className="nav-pill py-2 text-center text-emerald-300 hover:text-emerald-200 font-semibold">Find Events</Link>
                <Link href="/marketplace" className="nav-pill py-2 text-center text-emerald-300 hover:text-emerald-200 font-semibold">Marketplace</Link>
                <Link href="/post" className="nav-pill py-2 text-center text-emerald-300 hover:text-emerald-200 font-semibold">Create Post</Link>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-400/25 bg-neutral-900/70 p-6">
              <h2 className="text-lg font-semibold mb-3 text-white">Account Settings</h2>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Profile details (name, avatar)</li>
                <li>• Notification preferences</li>
                <li>• Privacy & visibility</li>
                <li>• Connected accounts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}