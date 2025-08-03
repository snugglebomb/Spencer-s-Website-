export default function FeedPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
      <h1 className="text-4xl font-bold mb-4">🌐 Community Feed</h1>
      <p className="text-gray-600 mb-6">Explore posts from the GMU community.</p>
      <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
        Refresh Feed (Coming Soon)
      </button>
    </main>
  );
}