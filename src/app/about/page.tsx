'use client';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-blue-950 py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            About Spencer
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Passionate about cybersecurity and technology with a drive to protect digital assets and systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Personal Info */}
          <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <span className="text-gray-400">Name:</span>
                <span className="text-white ml-2">Spencer Hibbert</span>
              </div>
              <div>
                <span className="text-gray-400">Location:</span>
                <span className="text-white ml-2">Fairfax, VA 22032</span>
              </div>
              <div>
                <span className="text-gray-400">Email:</span>
                <span className="text-blue-400 ml-2">spencerhibbert06@gmail.com</span>
              </div>
              <div>
                <span className="text-gray-400">Phone:</span>
                <span className="text-white ml-2">(202) 384-4349</span>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Current Status</h2>
            <div className="space-y-4">
              <div>
                <span className="text-gray-400">Education:</span>
                <span className="text-white ml-2">George Mason University</span>
              </div>
              <div>
                <span className="text-gray-400">Major:</span>
                <span className="text-white ml-2">Cybersecurity</span>
              </div>
              <div>
                <span className="text-gray-400">Year:</span>
                <span className="text-white ml-2">Current Student (2024-Present)</span>
              </div>
              <div>
                <span className="text-gray-400">Work:</span>
                <span className="text-white ml-2">Customer Service at Wegmans</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">About Me</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            I am a dedicated Cybersecurity major at George Mason University with a genuine passion for computer systems and technology. 
            My interest in cybersecurity stems from a desire to protect digital assets and ensure the security of technological infrastructure 
            that our modern world depends on.
          </p>
          <p className="text-gray-300 leading-relaxed mb-6">
            Currently pursuing my bachelor's degree while gaining real-world experience through my work at Wegmans, where I've developed 
            strong customer service skills, problem-solving abilities, and experience with various technological systems. This combination 
            of academic learning and practical experience has given me a well-rounded perspective on both technical and interpersonal aspects 
            of the technology field.
          </p>
          <p className="text-gray-300 leading-relaxed">
            I am actively working on expanding my technical skills through hands-on projects and pursuing industry certifications. 
            My goal is to contribute to the cybersecurity field by protecting organizations and individuals from evolving digital threats.
          </p>
        </div>

        {/* Languages */}
        <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Languages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🇺🇸</div>
              <h3 className="text-white font-semibold">English</h3>
              <p className="text-gray-400">Native/Fluent</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🇪🇸</div>
              <h3 className="text-white font-semibold">Spanish</h3>
              <p className="text-gray-400">Intermediate (Level 2)</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🇧🇷</div>
              <h3 className="text-white font-semibold">Portuguese</h3>
              <p className="text-gray-400">Beginner (Level 1)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
