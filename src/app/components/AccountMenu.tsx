"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function AccountMenu() {
  const { data: session, status } = useSession();
  if (status === "loading") return null;

  if (!session) {
    return (
      <button className="nav-pill px-3 py-2" onClick={() => signIn()}>
        Account
      </button>
    );
  }

  return (
    <div className="relative">
      <button className="nav-pill px-3 py-2">
        {session.user?.name ?? "Account"}
      </button>
      <div className="absolute right-0 mt-2 bg-neutral-900 border border-emerald-400/20 rounded-xl p-3 w-44">
        <Link className="block mb-2" href="/account">Profile</Link>
        <button className="block w-full text-left" onClick={() => signOut()}>Sign out</button>
      </div>
    </div>
  );
}