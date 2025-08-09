'use client';

import Link from 'next/link';

export default function TopNav() {
  return (
    <header className="w-full border-b border-white/10 bg-neutral-950/60 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-emerald-300 hover:text-emerald-200">
          GMUnderground
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/account" className="text-emerald-300 hover:text-emerald-200">Account</Link>
        </div>
      </nav>
    </header>
  );
}
