export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 flex flex-col items-center text-center">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-green-700 mb-2">GMUnderground</h1>
        <p className="text-lg text-gray-600 max-w-xl">
          Discover, connect, and promote what's happening around George Mason. 
          From events and housing to gigs and services — it all lives here.
        </p>
      </header>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-6 mb-16">
        <a
          href="/submit"
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition shadow-md"
        >
          📤 Post Something
        </a>
        <a
          href="/feed"
          className="bg-white text-green-700 border border-green-600 px-6 py-3 rounded-xl hover:bg-green-50 transition shadow-md"
        >
          🌐 View Feed
        </a>
      </div>

      {/* Sections */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left">
        {/* Events */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">🎉 Events</h2>
          <p className="text-gray-600">Find and promote campus events, parties, open mics, club meetings, and more.</p>
        </div>

        {/* Housing */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">🏠 Housing</h2>
          <p className="text-gray-600">Looking for a roommate or subleasing a spot near GMU? Post or browse housing options.</p>
        </div>

        {/* Hustles */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">🛠️ Side Hustles</h2>
          <p className="text-gray-600">Promote tutoring, car detailing, creative work, or any other student-run services.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} GMUnderground. Built by students for students.
      </footer>
    </main>
  );
}