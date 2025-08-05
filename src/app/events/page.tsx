'use client';
import Link from "next/link";
import { useState } from "react";

export default function EventsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  return (
    <div onClick={() => { setMenuOpen(false); setAccountOpen(false); }}>
      <main className="min-h-screen p-8 bg-white text-center">
        <div className="flex justify-between items-center mb-6">
          {/* Hamburger */}
          <div className="relative flex items-center gap-2">
            <div
              className="w-6 h-5 flex flex-col justify-between cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            >
              <span className="block h-0.5 bg-green-700 transition-transform hover:scale-110"></span>
              <span className="block h-0.5 bg-green-700 transition-transform hover:scale-110"></span>
              <span className="block h-0.5 bg-green-700 transition-transform hover:scale-110"></span>
            </div>
            {menuOpen && (
              <div className="absolute mt-8 bg-green-200 shadow-md rounded p-4 w-48 text-left z-10" onClick={(e) => e.stopPropagation()}>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-green-800 hover:underline">Home</Link>
                  </li>
                  <li>
                    <Link href="/feed" className="text-green-800 hover:underline">Feed</Link>
                  </li>
                  <li>
                    <Link href="/marketplace" className="text-green-800 hover:underline">Marketplace</Link>
                  </li>
                  <li>
                    <Link href="/events" className="text-green-800 hover:underline">Events</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Page title */}
          <h1 className="text-2xl font-semibold text-green-700">GMUnderground Events</h1>

          {/* Account dropdown */}
          <div className="relative">
            <button
              className="text-green-700 font-medium"
              onClick={(e) => { e.stopPropagation(); setAccountOpen(!accountOpen); }}
            >
              Account
            </button>
            {accountOpen && (
              <div className="absolute right-0 mt-2 bg-green-200 shadow-md rounded p-4 w-40 z-10" onClick={(e) => e.stopPropagation()}>
                <button className="block w-full text-left text-green-800 hover:underline">Sign In</button>
              </div>
            )}
          </div>
        </div>
        {/* Search bar and post button */}
        <div className="flex items-center justify-center mb-6 gap-2">
          <input
            type="text"
            placeholder="Search events..."
            className="border border-green-400 rounded px-4 py-2 w-1/2 placeholder-gray-700"
          />
          <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition">
            Post
          </button>
        </div>

        {/* Category filter */}
        <div className="flex items-center justify-center mb-6 gap-4 text-green-800">
          <span className="font-semibold">Categories:</span>
          <button className="hover:underline">Parties</button>
          <button className="hover:underline">Rush Events</button>
          <button className="hover:underline">Concerts</button>
          <button className="hover:underline">Clubs</button>
          <button className="hover:underline">Sports</button>
          <button className="hover:underline">Welcome Week</button>
          <button className="hover:underline">Campus Events</button>
        </div>

        {/* Event cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-green-100 border border-green-300 rounded-lg p-4 shadow hover:shadow-md transition">
              <h2 className="text-lg font-semibold text-green-800 mb-1">Event {i + 1}</h2>
              <p className="text-sm text-gray-600">Location: GMU Campus</p>
              <p className="text-sm text-gray-600">Date: Sept {i + 10}, 2025</p>
              <p className="text-sm text-gray-600">Time: 7:00 PM</p>
              <p className="text-sm text-gray-600 mb-4">Category: {["Parties", "Rush Events", "Concerts", "Clubs", "Sports", "Welcome Week", "Campus Events"][i % 7]}</p>
              <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition">Check Out</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}