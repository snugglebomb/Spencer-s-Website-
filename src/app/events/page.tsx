'use client';
import Link from "next/link";
import { useState } from "react";

export default function EventsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  return (
    <main className="min-h-screen p-8 bg-white text-center">
      <div className="flex justify-between items-center mb-6">
        {/* Hamburger */}
        <div className="relative flex items-center gap-2">
          <div
            className="w-6 h-5 flex flex-col justify-between cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="block h-0.5 bg-black transition-transform hover:scale-110"></span>
            <span className="block h-0.5 bg-black transition-transform hover:scale-110"></span>
            <span className="block h-0.5 bg-black transition-transform hover:scale-110"></span>
          </div>
          {menuOpen && (
            <div className="absolute mt-8 bg-green-100 shadow-md rounded p-4 w-48 text-left z-10">
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-green-700 hover:underline">Home</Link>
                </li>
                <li>
                  <Link href="/feed" className="text-green-700 hover:underline">Feed</Link>
                </li>
                <li>
                  <Link href="/marketplace" className="text-green-700 hover:underline">Marketplace</Link>
                </li>
                <li>
                  <Link href="/events" className="text-green-700 hover:underline">Events</Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Page title */}
        <h1 className="text-2xl font-semibold text-green-600">GMUnderground Events</h1>

        {/* Account dropdown */}
        <div className="relative">
          <button
            className="text-green-600 font-medium"
            onClick={() => setAccountOpen(!accountOpen)}
          >
            Account
          </button>
          {accountOpen && (
            <div className="absolute right-0 mt-2 bg-green-100 shadow-md rounded p-4 w-40 z-10">
              <button className="block w-full text-left text-green-700 hover:underline">Sign In</button>
            </div>
          )}
        </div>
      </div>
      <p className="mb-8 text-gray-700">
        Stay updated with campus events, gatherings, and announcements.
      </p>
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    </main>
  );
}