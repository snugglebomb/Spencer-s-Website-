'use client';

export default function Projects() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-blue-950 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Showcasing my work in cybersecurity and web development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* A.Beam Project */}
          <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-8 hover:border-blue-400/30 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">A.Beam</h2>
                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Cybersecurity Project
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6">
              A comprehensive cybersecurity project focused on developing security protocols and threat detection systems. 
              This project demonstrates practical application of cybersecurity principles and technologies.
            </p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Key Features:</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Security threat analysis and detection</li>
                <li>• Network monitoring and protection</li>
                <li>• Risk assessment and mitigation strategies</li>
                <li>• Implementation of security protocols</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Technologies Used:</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Security Frameworks</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Network Tools</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Threat Detection</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-yellow-400 font-medium">🚧 In Progress</span>
              <div className="text-sm text-gray-400">
                Academic Project • 2024
              </div>
            </div>
          </div>

          {/* GMUnderground Project */}
          <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-8 hover:border-purple-400/30 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">GMUnderground</h2>
                <span className="inline-block bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Web Development
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6">
              A modern web application serving as a platform for GMU students to connect, share, and discover campus activities. 
              Built with cutting-edge web technologies and focused on user experience.
            </p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Key Features:</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• User authentication and profiles</li>
                <li>• Real-time content sharing and interaction</li>
                <li>• Event discovery and management</li>
                <li>• Responsive design for all devices</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Technologies Used:</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Next.js</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">React</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">TypeScript</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Tailwind CSS</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Prisma</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-yellow-400 font-medium">🚧 In Progress</span>
              <div className="text-sm text-gray-400">
                Personal Project • 2024
              </div>
            </div>
          </div>
        </div>

        {/* Project Skills Section */}
        <div className="mt-16 bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Skills Demonstrated in Projects</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Cybersecurity</h3>
              <p className="text-gray-400">
                Implementing security protocols, threat detection, and risk assessment methodologies.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Web Development</h3>
              <p className="text-gray-400">
                Full-stack development using modern frameworks and best practices for scalable applications.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">System Design</h3>
              <p className="text-gray-400">
                Architecting secure, scalable systems with proper database design and user experience considerations.
              </p>
            </div>
          </div>
        </div>

        {/* Future Projects */}
        <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Future Project Goals</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">🔐 Advanced Security Tools</h3>
              <p className="text-gray-300">
                Planning to develop more sophisticated cybersecurity tools including penetration testing frameworks 
                and automated vulnerability assessment systems.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">🌐 Open Source Contributions</h3>
              <p className="text-gray-300">
                Looking to contribute to open source cybersecurity projects and collaborate with the security community 
                on tools that protect digital infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
