'use client';
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">🎓 Welcome to GMUnderground</h1>
      <p className="text-center text-gray-700 mb-8 max-w-xl">
        A student-powered hub for events, services, items for sale, and everything happening beneath the surface at GMU.
      </p>
      <div className="space-y-4 w-full max-w-sm">
        <Link href="/submit" className="block text-center bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
          📤 Submit a Post
        </Link>
        <Link href="/feed" className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          📰 View Feed
        </Link>
        <Link href="/about" className="block text-center bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition">
          📚 About This Site
        </Link>
      </div>
    </main>
  );
}