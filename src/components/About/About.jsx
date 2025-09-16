import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            About CivicTrack
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Simple mobile + web app to track every civic issue
          </p>
        </motion.div>

        <div className="mt-20">
          {/* What We Do Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">The Problem We Solve</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              People face issues daily: potholes, garbage, streetlights. Complaints often get lost or ignored. 
              No easy way to track progress of complaints. CivicTrack solves this with a simple mobile + web app.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Click a Photo</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Auto-capture location, add short text/voice note. Submit instantly
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Live Updates</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Citizens get live updates: Submitted → Acknowledged → Resolved
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Staff Dashboard</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Govt. staff get a dashboard to view, assign & resolve issues
                </p>
              </div>
            </div>
          </motion.div>

          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">How CivicTrack Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Report</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Click photo, auto-capture location, add voice note
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Submit</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Submit instantly → complaint goes to right department
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Track</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get live updates: Submitted → Acknowledged → Resolved
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Resolve</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Staff dashboard to view, assign & resolve issues
                </p>
              </div>
            </div>
          </motion.div>

          {/* Impact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">CivicTrack Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">1000+</div>
                <p className="text-gray-600 dark:text-gray-300">Issues Reported</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">85%</div>
                <p className="text-gray-600 dark:text-gray-300">Resolution Rate</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">50+</div>
                <p className="text-gray-600 dark:text-gray-300">Communities Served</p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Join CivicTrack
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Be part of the solution. Together, we can create better communities for everyone.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;