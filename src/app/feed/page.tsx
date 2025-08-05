'use client';
import Link from "next/link";
import { useState } from "react";

export default function FeedPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  return (
    <div onClick={() => { setMenuOpen(false); setAccountOpen(false); }}>
      <main className="min-h-screen p-8 bg-white text-center" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          {/* Hamburger */}
          <div className="relative flex items-center gap-2">
            <div
              className="w-6 h-5 flex flex-col justify-between cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="block h-0.5 bg-green-700 transition-transform hover:scale-110"></span>
              <span className="block h-0.5 bg-green-700 transition-transform hover:scale-110"></span>
              <span className="block h-0.5 bg-green-700 transition-transform hover:scale-110"></span>
            </div>
            {menuOpen && (
              <div className="absolute mt-8 bg-green-200 shadow-md rounded p-4 w-48 text-left z-10" onClick={(e) => e.stopPropagation()}>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-green-800 hover:text-green-900">Home</Link>
                  </li>
                  <li>
                    <Link href="/feed" className="text-green-800 hover:text-green-900">Feed</Link>
                  </li>
                  <li>
                    <Link href="/marketplace" className="text-green-800 hover:text-green-900">Marketplace</Link>
                  </li>
                  <li>
                    <Link href="/events" className="text-green-800 hover:text-green-900">Events</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Page title */}
          <h1 className="text-2xl font-semibold text-green-700">GMUnderground Feed</h1>

          {/* Account dropdown */}
          <div className="relative">
            <button
              className="text-green-700 font-medium"
              onClick={() => setAccountOpen(!accountOpen)}
            >
              Account
            </button>
            {accountOpen && (
              <div className="absolute right-0 mt-2 bg-green-200 shadow-md rounded p-4 w-40 z-10" onClick={(e) => e.stopPropagation()}>
                <button className="block w-full text-left text-green-800 hover:text-green-900">Sign In</button>
              </div>
            )}
          </div>
        </div>
        <p className="mb-8 text-gray-700">
          Explore posts made by GMU students. Coming soon!
        </p>
        <div className="mt-8">
          <Link href="/" className="text-green-700 hover:text-green-900">← Back to Home</Link>
        </div>
      </main>
    </div>
  );
}