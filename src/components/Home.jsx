import React, { useState } from 'react';
import { FaRoad, FaLightbulb, FaTrash, FaExclamationTriangle, FaMapMarkerAlt, FaCamera, FaMicrophone, FaCheckCircle } from "react-icons/fa";
import { motion } from 'framer-motion';
import Carousel from './Carousel';
import Footer from './Footer';
import Navbar from '../components/nav';
import { Link } from 'react-router-dom';

const Home = () => {
  const [activeRole, setActiveRole] = useState(null);

  const dashboardStyles = {
    citizen: {
      background: "#1976D2",
      textColor: "#FFFFFF",
      hoverColor: "#1565C0",
      borderColor: "#2196F3",
    },
    track: {
      background: "#7B1FA2",
      textColor: "#FFFFFF",
      hoverColor: "#6A1B9A",
      borderColor: "#9C27B0",
    },
    trending: {
      background: "#2E7D32",
      textColor: "#FFFFFF",
      hoverColor: "#1B5E20",
      borderColor: "#4CAF50",
    },
    dashboard: {
      background: "#D32F2F",
      textColor: "#FFFFFF",
      hoverColor: "#C62828",
      borderColor: "#F44336",
    },
  };

const roles = [
  {
    name: "Report Issue",
    style: dashboardStyles.citizen,
    // Extracted from flaticon.com/free-icon/report_1450932
    icon: "https://cdn-icons-png.flaticon.com/512/1450/1450932.png",
    alt: "Report Icon",
    to: "/report",
  },
  {
    name: "Track My Report",
    style: dashboardStyles.track,
    // Kept the previously suggested icon as a link was not provided
    icon: "https://cdn-icons-png.flaticon.com/512/2838/2838912.png",
    alt: "Track Icon",
    to: "/track-my-report",
  },
  {
    name: "Trending Issues",
    style: dashboardStyles.trending,
    // Extracted from flaticon.com/free-icon/trend_6797554
    icon: "https://cdn-icons-png.flaticon.com/512/6797/6797554.png",
    alt: "Trending Icon",
    to: "/trending-issue",
  },
  {
    name: "Staff Dashboard",
    style: dashboardStyles.dashboard,
    // Extracted from icons8.com/icon/52233/admin-settings-male
    icon: "https://img.icons8.com/fluency/96/admin-settings-male.png",
    alt: "Dashboard Icon",
    to: "/dashboard",
  },
];
  const civicFeatures = [
    {
      icon: <FaCamera />,
      title: "Photo Capture",
      desc: "Click a photo of the issue with automatic location detection.",
    },
    {
      icon: <FaMicrophone />,
      title: "Voice Notes",
      desc: "Add voice descriptions for better issue documentation.",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Auto Location",
      desc: "GPS automatically captures your exact location.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Live Updates",
      desc: "Get real-time status: Submitted → Acknowledged → Resolved.",
    },
  ];

  const issueTypes = [
    {
      icon: <FaRoad />,
      title: "Potholes",
      desc: "Report road damage and potholes that need repair.",
    },
    {
      icon: <FaTrash />,
      title: "Garbage",
      desc: "Report uncollected waste and sanitation issues.",
    },
    {
      icon: <FaLightbulb />,
      title: "Streetlights",
      desc: "Report broken or non-functioning streetlights.",
    },
    {
      icon: <FaExclamationTriangle />,
      title: "Other Issues",
      desc: "Report any other civic problems in your area.",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 text-white">
        {/* Hero Section with Carousel */}
        <div className="relative">
          <Navbar />
          <div className="relative h-[600px]">
            <Carousel />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                >
                  CivicTrack - Track Every Issue
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-2xl mb-8 text-gray-200"
                >
                  Simple mobile + web app to report and track civic issues
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col md:flex-row gap-4 justify-center"
                >
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/report"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-300"
                  >
                    Report Issue
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/track-my-report"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-300"
                  >
                    Track Reports
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-10 mt-10 mb-10"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl font-bold mb-10 text-center tracking-wide text-white"
          >
            Welcome to CivicTrack
          </motion.h2>
          
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-12 text-lg leading-relaxed text-center font-semibold text-gray-200"
          >
            <p>
              People face issues daily: potholes, garbage, streetlights. Complaints often get lost or ignored. 
              No easy way to track progress of complaints. CivicTrack solves this with a simple mobile + web app.
            </p>
          </motion.section>

          {/* Role Selection Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {roles.map((role, index) => (
              <Link
                key={index}
                to={role.to}
                className="no-underline"
              >
                <motion.div
                  className="flex flex-col items-center justify-center text-center rounded-lg shadow-xl transition-all duration-300 p-6 hover:scale-105"
                  style={{
                    backgroundColor: role.style.background,
                    color: role.style.textColor,
                    border: activeRole === index ? `2px solid ${role.style.borderColor}` : 'none',
                  }}
                  onMouseEnter={() => setActiveRole(index)}
                  onMouseLeave={() => setActiveRole(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={role.icon}
                    alt={role.alt}
                    className="mb-4 w-16 h-16 rounded-full object-cover"
                  />
                  <span className="text-lg font-semibold">{role.name}</span>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Civic Features Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-white">How CivicTrack Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {civicFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-4xl text-white mx-auto justify-items-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="mt-2 text-gray-200">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Issue Types Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Report These Issues</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {issueTypes.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-4xl text-white mx-auto justify-items-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="mt-2 text-gray-200">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          {/* Testimonials Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-14"
          >
            <h2 className="text-3xl font-semibold text-center mb-8 text-white">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { quote: "Reported a pothole and it was fixed within 2 days!", author: "Rajesh Kumar, Citizen" },
                { quote: "The garbage collection issue was resolved quickly.", author: "Priya Sharma, Resident" },
                { quote: "CivicTrack makes it so easy to report and track issues.", author: "Amit Patel, Community Leader" },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="italic text-gray-200">{testimonial.quote}</p>
                  <h4 className="font-bold mt-4 text-white">- {testimonial.author}</h4>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>

        {/* Add Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home; 
