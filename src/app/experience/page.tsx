'use client';

export default function Experience() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-blue-950 py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Experience
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Professional experience in customer service and various technical environments.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {/* Current Position */}
          <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-8 relative">
            <div className="absolute left-8 top-8 w-4 h-4 bg-green-500 rounded-full border-4 border-neutral-900"></div>
            <div className="ml-12">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Customer Service Desk</h2>
                  <h3 className="text-xl text-blue-400 font-medium">Wegmans - Chantilly</h3>
                </div>
                <div className="text-green-400 font-medium">
                  September 2023 - Present
                </div>
              </div>
              <ul className="text-gray-300 space-y-2">
                <li>• Customer assistance and problem resolution</li>
                <li>• Transaction handling and financial operations</li>
                <li>• Problem solving for complex customer issues</li>
                <li>• Phone call management and telecommunications</li>
                <li>• Remote work capabilities and telework experience</li>
              </ul>
            </div>
          </div>

          {/* Previous Position 1 */}
          <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-8 relative">
            <div className="absolute left-8 top-8 w-4 h-4 bg-blue-500 rounded-full border-4 border-neutral-900"></div>
            <div className="ml-12">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Cashier</h2>
                  <h3 className="text-xl text-blue-400 font-medium">Wendy's - Fairfax</h3>
                </div>
                <div className="text-gray-400 font-medium">
                  June 2022 - September 2023
                </div>
              </div>
              <ul className="text-gray-300 space-y-2">
                <li>• Customer service and order processing</li>
                <li>• Cash handling and point-of-sale systems</li>
                <li>• Food preparation and kitchen operations</li>
                <li>• Fast-paced environment management</li>
              </ul>
            </div>
          </div>

          {/* Previous Position 2 */}
          <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-8 relative">
            <div className="absolute left-8 top-8 w-4 h-4 bg-gray-500 rounded-full border-4 border-neutral-900"></div>
            <div className="ml-12">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Dock Worker</h2>
                  <h3 className="text-xl text-blue-400 font-medium">Belle Haven Marina - Alexandria</h3>
                </div>
                <div className="text-gray-400 font-medium">
                  June 2020 - July 2021
                </div>
              </div>
              <ul className="text-gray-300 space-y-2">
                <li>• All dock-related operations and maintenance</li>
                <li>• Physical labor and equipment handling</li>
                <li>• Marine environment operations</li>
                <li>• Team coordination and safety protocols</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Education</h2>
          
          <div className="space-y-6">
            {/* Current Education */}
            <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">Bachelor's Degree in Cybersecurity</h3>
                  <h4 className="text-xl text-blue-400 font-medium">George Mason University - Fairfax</h4>
                </div>
                <div className="text-green-400 font-medium">
                  August 2024 - Present
                </div>
              </div>
              <p className="text-gray-300">
                Currently pursuing a comprehensive education in cybersecurity, including network security, 
                digital forensics, risk management, and ethical hacking.
              </p>
            </div>

            {/* High School */}
            <div className="bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">High School Diploma</h3>
                  <h4 className="text-xl text-blue-400 font-medium">Robinson Secondary School - Fairfax</h4>
                </div>
                <div className="text-gray-400 font-medium">
                  September 2020 - June 2024
                </div>
              </div>
              <p className="text-gray-300">
                Completed high school education with a focus on preparing for higher education in technology fields.
              </p>
            </div>
          </div>
        </div>

        {/* Key Skills from Experience */}
        <div className="mt-16 bg-neutral-900/50 backdrop-blur border border-white/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Skills Developed Through Experience</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Customer Relations</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Customer assistance and support</li>
                <li>• Problem resolution and troubleshooting</li>
                <li>• Professional communication</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Technical Operations</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Point-of-sale systems management</li>
                <li>• Telecommunications and phone systems</li>
                <li>• Remote work technologies</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Financial Management</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Transaction processing</li>
                <li>• Cash handling and accounting</li>
                <li>• Money management systems</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Operations</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Team coordination and management</li>
                <li>• Multi-tasking in fast-paced environments</li>
                <li>• Safety protocols and procedures</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
