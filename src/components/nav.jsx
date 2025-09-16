import { useState, useEffect, useRef, lazy, Suspense } from "react";
// Import new icons for the dropdown menu
import { Menu, X, Sun, Moon, User, Settings, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Lazy load the logo component
const Logo = lazy(() => import('./Logo'));

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // NEW: State to manage the profile dropdown
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const location = useLocation();
  const menuRef = useRef(null);
  // NEW: Ref for the profile dropdown to detect outside clicks
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Debounced scroll handler
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 20);
      }, 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Combined Click Outside handler for both mobile and profile menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      // NEW: Close profile menu if click is outside
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // For demonstration, I'm setting isLoggedIn to true. 
    // In your actual app, you would use: setIsLoggedIn(!!token);
    setIsLoggedIn(true); 
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
    { to: "/report", label: "Report Issue" },
    { to: "/track-my-report", label: "Track My Report" },
    { to: "/trending-issue", label: "Trending Issues" },
    { to: "/dashboard", label: "Staff Dashboard" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLoginClick = () => {
    setIsMenuOpen(false);
    navigate('/login');
  };

  const handleSignupClick = () => {
    setIsMenuOpen(false);
    navigate('/signup');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsProfileMenuOpen(false); // Close menu on logout
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg"
          : "bg-white dark:bg-gray-900"
      }`}
      style={{ boxShadow: isScrolled ? '0 4px 24px 0 rgba(0,0,0,0.08)' : undefined }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.08, rotate: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex-shrink-0"
          >
            <Link to="/home" className="flex items-center space-x-2">
              <Suspense fallback={<div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />}>
                <Logo />
              </Suspense>
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-wide">
                CivicTrack
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.to}
                whileHover={{ y: -2, scale: 1.08, backgroundColor: "#e6f3ff" }}
                transition={{ duration: 0.2 }}
                className="relative rounded-lg px-2 py-1"
              >
                <Link
                  to={link.to}
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    isActive(link.to)
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-full border-2 transition-all duration-200 focus:outline-none ${
                isDarkMode
                  ? 'bg-gray-900 border-blue-400 text-yellow-300 shadow-lg'
                  : 'bg-white border-blue-600 text-blue-600 shadow-lg'
              }`}
              aria-label="Toggle dark mode"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
            </motion.button>

            {/* --- MODIFICATION START --- */}
            {isLoggedIn ? (
              // NEW: Profile Dropdown Menu
              <div className="relative" ref={profileMenuRef}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="block focus:outline-none"
                >
                  <img
                    className="h-10 w-10 rounded-full object-cover border-2 border-blue-500"
                    // Replace with actual user profile image URL
                    src="https://lh3.googleusercontent.com/a/ACg8ocKRkKfeuqSWxgOd8NDy_R0w4sJmQX2Yg7ifP5uz2CqlowmXiYoj=s360-c-no" 
                    alt="User profile"
                  />
                </motion.button>
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg bg-[#272f3f] text-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-700/60 transition-colors"
                        >
                          <User size={18} />
                          Profile
                        </Link>
                        <Link
                          to="/settings"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-700/60 transition-colors"
                        >
                          <Settings size={18} />
                          Settings
                        </Link>
                        <button
                          onClick={() => {
                            toggleDarkMode();
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-700/60 transition-colors"
                        >
                          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                        <div className="border-t border-gray-600/50 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Original Login/Signup buttons
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLoginClick}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSignupClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md"
                >
                  Sign Up
                </motion.button>
              </>
            )}
            {/* --- MODIFICATION END --- */}
          </div>


          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu (unchanged) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
            ref={menuRef}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <motion.div
                  key={link.to}
                  whileHover={{ x: 5, scale: 1.05, backgroundColor: "#e6f3ff" }}
                  transition={{ duration: 0.2 }}
                  className="block px-3 py-2 rounded-md"
                >
                  <Link
                    to={link.to}
                    className={`block text-base font-medium ${
                      isActive(link.to)
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between px-3">
                  <motion.button
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-full border-2 transition-all duration-200 focus:outline-none ${
                      isDarkMode
                        ? 'bg-gray-900 border-blue-400 text-yellow-300 shadow-lg'
                        : 'bg-white border-blue-600 text-blue-600 shadow-lg'
                    }`}
                    aria-label="Toggle dark mode"
                    title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
                  </motion.button>
                  <div className="flex space-x-4">
                    {isLoggedIn ? (
                      <>
                        <Link
                          to="/profile"
                          onClick={() => setIsMenuOpen(false)}
                          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}