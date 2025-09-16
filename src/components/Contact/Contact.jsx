import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Twitter } from 'lucide-react';

const Contact = () => {
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
            Contact Us
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Get in touch with us for any queries or support
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              {/* Phone Numbers */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Phone Numbers</h3>
                  <div className="mt-2 space-y-2">
                    <a href="tel:7078247468" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                      +91 7078247468
                    </a>
                    <br />
                    <a href="tel:9084077858" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                      +91 9084077858
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h3>
                  <a href="mailto:vinaycahuhan1352002@gmail.com" className="mt-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                    vinaycahuhan1352002@gmail.com
                  </a>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Office Address</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    THDC IHET
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex space-x-4">
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a href="https://x.com/VINAYCH59973632" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                      <Twitter className="h-6 w-6" />
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Social Media</h3>
                  <div className="mt-2 space-y-2">
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                      Instagram
                    </a>
                    <br />
                    <a href="https://x.com/VINAYCH59973632" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;