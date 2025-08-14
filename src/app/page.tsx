'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-blue-950">
      {/* Hero Section */}
      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Spencer Hibbert
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-300 mb-6 font-light">
                Aspiring Cybersecurity Professional
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Cybersecurity Major at George Mason University pursuing a career in the Cybersecurity and Tech field. 
                Passionate about computer systems, technology, and protecting digital assets.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mb-16">
              <Link href="/about" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Learn More About Me
              </Link>
              <Link href="/projects" className="px-8 py-3 border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                View My Projects
              </Link>
              <Link href="/contact" className="px-8 py-3 border-2 border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview Cards */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Experience Card */}
            <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-8 hover:border-blue-400/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Professional Experience</h3>
              <p className="text-gray-400 mb-4">
                Currently working at Wegmans in Customer Service with previous experience in various customer-facing roles.
              </p>
              <Link href="/experience" className="text-blue-400 hover:text-blue-300 font-medium">
                View Experience →
              </Link>
            </div>

            {/* Skills Card */}
            <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-8 hover:border-purple-400/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Technical Skills</h3>
              <p className="text-gray-400 mb-4">
                Proficient in cybersecurity, network management, Linux, Windows, and various technical systems.
              </p>
              <Link href="/skills" className="text-purple-400 hover:text-purple-300 font-medium">
                View Skills →
              </Link>
            </div>

            {/* Projects Card */}
            <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-8 hover:border-cyan-400/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Featured Projects</h3>
              <p className="text-gray-400 mb-4">
                Working on A.Beam cybersecurity project and GMUnderground web development project.
              </p>
              <Link href="/projects" className="text-cyan-400 hover:text-cyan-300 font-medium">
                View Projects →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-4 py-16 border-t border-white/10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Interested in collaborating or learning more about my work? I'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:spencerhibbert06@gmail.com" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
              📧 Email Me
            </a>
            <span className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg">
              📱 (202) 384-4349
            </span>
            <span className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg">
              📍 Fairfax, VA
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}