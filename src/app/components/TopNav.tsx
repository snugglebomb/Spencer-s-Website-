'use client';

import Link from 'next/link';

export default function TopNav() {
  return (
    <header className="w-full border-b border-white/10 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50">
      <nav className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-blue-400 hover:text-blue-300 transition-colors">
          Spencer Hibbert
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
          <Link href="/experience" className="text-gray-300 hover:text-white transition-colors">Experience</Link>
          <Link href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link>
          <Link href="/skills" className="text-gray-300 hover:text-white transition-colors">Skills</Link>
          <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
