'use client';
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col justify-between p-8 text-center relative bg-fixed bg-gradient-to-br from-green-100 via-gray-50 to-green-200">
      {/* Top Navbar */}
      <div className="flex justify-between items-start mb-8">
        {/* Hamburger + Dropdown */}
        <div className="relative">
          <div
            className="w-6 h-5 flex flex-col justify-between cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="block h-0.5 bg-black transition-transform hover:scale-110"></span>
            <span className="block h-0.5 bg-black transition-transform hover:scale-110"></span>
            <span className="block h-0.5 bg-black transition-transform hover:scale-110"></span>
          </div>
          {menuOpen && (
            <div className="absolute mt-2 bg-white shadow-md rounded p-4 w-48 text-left">
              <p className="text-gray-500">Dropdown menu (coming soon)</p>
            </div>
          )}
        </div>

        <div className="text-right">
          <h1 className="text-2xl font-semibold text-green-700">GMUnderground</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">🎓 Welcome to GMUnderground</h1>
        <p className="text-center text-gray-700 mb-8 max-w-xl">
          A student-powered hub for events, services, items for sale, and everything happening beneath the surface at GMU.
        </p>
        <div className="space-y-4 w-full max-w-sm">
          <Link href="/post" className="block text-center bg-green-500 text-white py-2 rounded hover:bg-green-600 transform transition hover:scale-105">
            📤 Submit a Post
          </Link>
          <Link href="/feed" className="block text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transform transition hover:scale-105">
            📰 View Feed
          </Link>
          <Link href="/about" className="block text-center bg-green-800 text-white py-2 rounded hover:bg-green-900 transform transition hover:scale-105">
            📚 About This Site
          </Link>
        </div>
      </div>

      {/* Popular Posts Marquee */}
      <div className="mt-12 overflow-hidden whitespace-nowrap border-t border-b py-4">
        <div className="animate-marquee inline-block min-w-full">
          <span className="mx-4 text-gray-800">🔥 Post 1: Free pizza in SUB 1 today!</span>
          <span className="mx-4 text-gray-800">🏀 Post 2: 5v5 basketball at RAC 6PM!</span>
          <span className="mx-4 text-gray-800">🎸 Post 3: Live music near Horizon Hall!</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-600 text-sm">
        <p>© 2025 GMUnderground. All rights reserved.</p>
        <p><a href="#" className="underline hover:scale-105 transition">Terms of Service</a> | <a href="#" className="underline hover:scale-105 transition">Privacy Policy</a></p>
      </footer>

      {/* Animation Styles */}
      <style jsx>{`
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </main>
  );
}