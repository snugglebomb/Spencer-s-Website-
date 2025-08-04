export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center">🏠 Welcome to GMUnderground</h1>
      <div className="mt-10 text-center space-x-4">
        <Link
          href="/submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Submit a Post
        </Link>
        <Link
          href="/feed"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          View Feed
        </Link>
      </div>
    </main>
  );
}