'use client';

export default function Skills() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-blue-950 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            A comprehensive overview of my technical and professional capabilities.
          </p>
        </div>

        {/* Technical Skills */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Technical Skills</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Cybersecurity */}
            <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-4 sm:p-6 hover:border-red-400/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Cybersecurity</h3>
              <ul className="text-gray-300 space-y-1 text-sm sm:text-base">
                <li>• Network Security</li>
                <li>• Threat Assessment</li>
                <li>• Security Protocols</li>
                <li>• Risk Management</li>
                <li>• Vulnerability Analysis</li>
              </ul>
            </div>

            {/* Operating Systems */}
            <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-4 sm:p-6 hover:border-blue-400/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Operating Systems</h3>
              <ul className="text-gray-300 space-y-1 text-sm sm:text-base">
                <li>• Linux </li>
                <li>• Windows Systems</li>
                <li>• iOS/macOS</li>
                <li>• Command Line Interface</li>
                <li>• System Configuration</li>
              </ul>
            </div>

            {/* Network Management */}
            <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-4 sm:p-6 hover:border-green-400/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Network Management</h3>
              <ul className="text-gray-300 space-y-1 text-sm sm:text-base">
                <li>• Network Configuration</li>
                <li>• Network Monitoring</li>
                <li>• Troubleshooting</li>
                <li>• Security Protocols</li>
                <li>• Infrastructure Management</li>
              </ul>
            </div>

            {/* Programming & Development */}
            <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-4 sm:p-6 hover:border-purple-400/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Computer Work</h3>
              <ul className="text-gray-300 space-y-1 text-sm sm:text-base">
                <li>• System Administration</li>
                <li>• Software Installation</li>
                <li>• Hardware Troubleshooting</li>
                <li>• Data Management</li>
                <li>• Technical Support</li>
              </ul>
            </div>

            {/* Telecommunications */}
            <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-4 sm:p-6 hover:border-yellow-400/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Telecommunications</h3>
              <ul className="text-gray-300 space-y-1 text-sm sm:text-base">
                <li>• VoIP Systems</li>
                <li>• Phone System Management</li>
                <li>• Remote Communication</li>
                <li>• Technical Support</li>
                <li>• Call Center Operations</li>
              </ul>
            </div>

            {/* Financial Management */}
            <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-4 sm:p-6 hover:border-cyan-400/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Financial Skills</h3>
              <ul className="text-gray-300 space-y-1 text-sm sm:text-base">
                <li>• Accounting Principles</li>
                <li>• Money Management</li>
                <li>• Transaction Processing</li>
                <li>• Financial Reporting</li>
                <li>• Budget Management</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Professional Skills */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Professional Skills</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-4 sm:p-6 text-center hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🤝</div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Customer Service</h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Expert in providing exceptional customer support and problem resolution
              </p>
            </div>

            <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-4 sm:p-6 text-center hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">💰</div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Cashiering</h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Experienced in POS systems and financial transaction handling
              </p>
            </div>

            <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-4 sm:p-6 text-center hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">👥</div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Managing</h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Leadership and team coordination in various environments
              </p>
            </div>

            <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-4 sm:p-6 text-center hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🔧</div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Problem Solving</h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Strong analytical and troubleshooting capabilities
              </p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Certifications</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* CompTIA Security+ */}
            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-400/30 rounded-xl p-4 sm:p-6 hover:border-green-400/50 transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-lg flex items-center justify-center mb-3 sm:mb-0 sm:mr-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">CompTIA Security+</h3>
                  <span className="inline-block bg-green-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mt-1">
                    Certified
                  </span>
                </div>
              </div>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                Industry-standard certification demonstrating foundational cybersecurity skills and knowledge.
              </p>
              <div className="text-xs sm:text-sm text-gray-400">
                Validates skills in: Threat Management, Cryptography, Identity Management, Risk Management
              </div>
            </div>

            {/* CySA+ In Progress */}
            <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-400/30 rounded-xl p-4 sm:p-6 hover:border-yellow-400/50 transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-3 sm:mb-0 sm:mr-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">CompTIA CySA+</h3>
                  <span className="inline-block bg-yellow-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mt-1">
                    In Progress
                  </span>
                </div>
              </div>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                Advanced cybersecurity analyst certification focusing on threat detection and analysis.
              </p>
              <div className="text-xs sm:text-sm text-gray-400">
                Will validate skills in: Threat Hunting, Incident Response, Security Analytics, Compliance
              </div>
            </div>
          </div>
        </div>

        {/* Skill Levels Visualization */}
        <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center">Proficiency Levels</h2>
          
          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium text-sm sm:text-base">Cybersecurity</span>
                <span className="text-gray-400 text-xs sm:text-sm">Intermediate</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-3/5 transition-all duration-1000 ease-out"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium text-sm sm:text-base">Network Management</span>
                <span className="text-gray-400 text-xs sm:text-sm">Intermediate</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full w-3/5 transition-all duration-1000 ease-out"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium text-sm sm:text-base">Customer Service</span>
                <span className="text-gray-400 text-xs sm:text-sm">Expert</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-500 to-red-500 h-2 rounded-full w-11/12 transition-all duration-1000 ease-out"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium text-sm sm:text-base">Linux/Windows Systems</span>
                <span className="text-gray-400 text-xs sm:text-sm">Intermediate</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-2/3 transition-all duration-1000 ease-out"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium text-sm sm:text-base">Financial Management</span>
                <span className="text-gray-400 text-xs sm:text-sm">Intermediate</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full w-3/4 transition-all duration-1000 ease-out"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
