'use client';
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <div
      onClick={() => {
        setMenuOpen(false);
        setAccountOpen(false);
      }}
    >
      <main className="min-h-screen flex flex-col justify-between p-8 text-center relative bg-fixed bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat">
      {/* Top Navbar */}
      <div className="flex justify-between items-start mb-8">
        {/* Left Hamburger Icon */}
        <div className="relative">
          <div
            className="w-6 h-5 flex flex-col justify-between cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
          >
            <span className="block h-0.5 bg-green-500 transition-transform hover:scale-110"></span>
            <span className="block h-0.5 bg-green-500 transition-transform hover:scale-110"></span>
            <span className="block h-0.5 bg-green-500 transition-transform hover:scale-110"></span>
          </div>
          {menuOpen && (
            <div className="absolute mt-6 bg-green-100 shadow-md rounded p-4 w-48 text-left z-10" onClick={(e) => e.stopPropagation()}>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-green-500 hover:underline">Home</Link>
                </li>
                <li>
                  <Link href="/feed" className="text-green-500 hover:underline">Feed</Link>
                </li>
                <li>
                  <Link href="/marketplace" className="text-green-500 hover:underline">Marketplace</Link>
                </li>
                <li>
                  <Link href="/events" className="text-green-500 hover:underline">Events</Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Account Dropdown on Right */}
        <div className="relative">
          <span
            onClick={(e) => {
              e.stopPropagation();
              setAccountOpen(!accountOpen);
            }}
            className="text-green-500 font-medium cursor-pointer hover:underline"
          >
            Account
          </span>
          {accountOpen && (
            <div className="absolute right-0 mt-2 bg-green-100 shadow-md rounded p-4 w-40 text-left" onClick={(e) => e.stopPropagation()}>
              <button className="w-full text-green-500 hover:text-green-600">Sign In</button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">🎓 Welcome to GMUnderground</h1>
        <p className="text-center text-green-500 mb-8 max-w-xl">
          A student-powered hub for events, services, items for sale, and everything happening beneath the surface at GMU.
        </p>
        <div className="space-y-4 w-full max-w-sm">
          <Link href="/feed" className="block text-center bg-green-500 text-white py-2 rounded hover:bg-green-500 transform transition hover:scale-105">
            📰 View Feed
          </Link>
          <Link href="/events" className="block text-center bg-green-500 text-white py-2 rounded hover:bg-green-500 transform transition hover:scale-105">
            📅 View Events
          </Link>
          <Link href="/marketplace" className="block text-center bg-green-500 text-white py-2 rounded hover:bg-green-500 transform transition hover:scale-105">
            💰 Visit Marketplace
          </Link>
        </div>
      </div>

      {/* Popular Posts Marquee */}
      <div className="mt-12 overflow-hidden whitespace-nowrap border-t border-b py-4">
        <div className="animate-marquee inline-block min-w-full">
          <div className="inline-block mx-4 px-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-green-500">
            🔥 Post 1: Free pizza in SUB 1 today!
          </div>
          <div className="inline-block mx-4 px-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-green-500">
            🏀 Post 2: 5v5 basketball at RAC 6PM!
          </div>
          <div className="inline-block mx-4 px-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-green-500">
            🎸 Post 3: Live music near Horizon Hall!
          </div>
        </div>
      </div>

      {/* Scroll Down to Sign Up Section */}
      <div className="mt-16 flex justify-center items-center">
        <div className="bg-white bg-opacity-80 border border-gray-300 rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
          <h2 className="text-2xl font-semibold text-green-500 mb-4">Join GMUnderground</h2>
          <p className="text-green-500 mb-6">Sign in or create an account to start posting and interacting.</p>
          <div className="flex flex-col gap-4">
            <button className="bg-green-500 text-white py-2 rounded hover:bg-green-500 transform transition hover:scale-105">
              Sign Up
            </button>
            <button className="bg-green-500 text-white py-2 rounded hover:bg-green-500 transform transition hover:scale-105">
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-green-500 text-sm">
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
    </div>
  );
}