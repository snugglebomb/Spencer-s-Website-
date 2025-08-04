'use client';
import Link from "next/link";

export default function SubmitPage() {
  return (
    <main className="min-h-screen p-8 bg-white text-center">
      <h1 className="text-2xl font-semibold text-green-600 mb-4">Submit to GMUnderground</h1>
      <p className="mb-8 text-gray-700">
        Promote events, sell items, or connect with students. Posting tools coming soon!
      </p>
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    </main>
  );
}