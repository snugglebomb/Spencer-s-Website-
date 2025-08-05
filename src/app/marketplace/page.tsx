'use client';
import Link from "next/link";
import { useState } from "react";

export default function MarketplacePage() {
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
        <h1 className="text-2xl font-semibold text-green-700">GMUnderground Marketplace</h1>

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
              <button className="block w-full text-left text-green-800 hover:underline">Sign In</button>
            </div>
          )}
        </div>
      </div>
      <p className="mb-8 text-gray-700">
        Welcome to the student marketplace. Post, browse, and trade freely.
      </p>
      {/* Search and Sell */}
      <div className="flex justify-center items-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search items..."
          className="border border-gray-300 rounded px-4 py-2 w-64"
        />
        <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition">
          Sell
        </button>
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="border border-gray-300 rounded shadow p-4">
            <img
              src="https://via.placeholder.com/150"
              alt={`Item ${index + 1}`}
              className="w-full h-32 object-cover mb-2 rounded"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Item {index + 1}</h2>
            <p className="text-gray-500 text-sm">Placeholder description</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    </main>
    </div>
  );
}