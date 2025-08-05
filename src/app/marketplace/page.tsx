'use client';
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen p-8 bg-white text-center">
      <h1 className="text-2xl font-semibold text-purple-600 mb-4">About GMUnderground</h1>
      <p className="mb-8 text-gray-700">
        This site is built by students, for students. Stay tuned for upcoming features!
      </p>
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    </main>
  );
}