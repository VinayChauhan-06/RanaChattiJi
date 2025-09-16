import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/nav';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import ReportIssue from './components/ReportIssue/ReportIssue';
import Hero from './components/Hero/Hero';
import TrackMyReport from './components/TrackMyReport';
import TrendingIssue from './components/TrendingIssue';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Nav />
        <main className="pt-16">
          <Routes>
            <Route path="/home" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/track-my-report" element={<TrackMyReport />} />
            <Route path="/trending-issue" element={<TrendingIssue />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 