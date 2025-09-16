import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, MapPin, Calendar, User, Clock, CheckCircle, AlertCircle, RefreshCw, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockReports = [
  {
    id: 1,
    status: 'pending',
    date: '2024-01-15',
    details: 'Big pothole near ISBT road, causing traffic jams and damage to vehicles',
    category: 'Potholes',
    location: 'ISBT, Dehradun',
    reporter: 'Vinay',
    reporterEmail: 'amit.sharma@gmail.com',
    userId: 1,
    assignedTo: null,
    priority: 'high',
    photo: 'https://plus.unsplash.com/premium_photo-1661663674755-690655d38912?q=80&w=300&h=200&fit=crop&crop=center',
    audioNote: null,
    timeline: [
      { status: 'submitted', date: '2024-01-15T10:30:00Z', message: 'Issue reported successfully' },
      { status: 'acknowledged', date: '2024-01-15T11:00:00Z', message: 'Acknowledged by Roads Department' },
      { status: 'pending', date: '2024-01-15T11:05:00Z', message: 'Awaiting assignment to repair crew' }
    ]
  },
  {
    id: 2,
    status: 'in_progress',
    date: '2024-01-14',
    details: 'Garbage not collected for 4 days, bins overflowing',
    category: 'Garbage',
    location: 'Kargi Chowk, Dehradun',
    reporter: 'Vinay',
    reporterEmail: 'rohit.verma@yahoo.com',
    userId: 1,
    assignedTo: 'Sanitation Dept',
    priority: 'medium',
    photo: 'https://images.unsplash.com/photo-1657811146442-0d66d65dbe92?q=80&w=300&h=200&fit=crop&crop=center',
    audioNote: null,
    timeline: [
      { status: 'submitted', date: '2024-01-14T09:15:00Z', message: 'Issue reported successfully' },
      { status: 'acknowledged', date: '2024-01-14T09:45:00Z', message: 'Acknowledged by Sanitation Department' },
      { status: 'in_progress', date: '2024-01-14T14:30:00Z', message: 'Assigned to Sanitation Dept - Cleaning scheduled' }
    ]
  },
  {
    id: 3,
    status: 'resolved',
    date: '2024-01-10',
    details: 'Streetlight not working near Clock Tower, area unsafe at night',
    category: 'Streetlights',
    location: 'Clock Tower, Dehradun',
    reporter: 'Vinay',
    reporterEmail: 'priya.singh@gmail.com',
    userId: 1,
    assignedTo: 'Electricity Dept',
    priority: 'medium',
    photo: 'https://images.unsplash.com/photo-1672441962683-5237d7d7a8df?q=80&w=300&h=200&fit=crop&crop=center',
    audioNote: null,
    timeline: [
      { status: 'submitted', date: '2024-01-10T18:20:00Z', message: 'Issue reported successfully' },
      { status: 'acknowledged', date: '2024-01-11T08:00:00Z', message: 'Acknowledged by Electricity Department' },
      { status: 'in_progress', date: '2024-01-11T10:15:00Z', message: 'Repair scheduled by Electricity Dept' },
      { status: 'resolved', date: '2024-01-12T16:45:00Z', message: 'Streetlight repaired - Issue resolved' }
    ]
  },
  {
    id: 4,
    status: 'pending',
    date: '2024-01-12',
    details: 'Water leakage in Patel Nagar, road surface getting damaged',
    category: 'Water Issues',
    location: 'Patel Nagar, Dehradun',
    reporter: 'Vinay',
    reporterEmail: 'neha.rawat@gmail.com',
    userId: 2,
    assignedTo: 'Water Dept',
    priority: 'medium',
    photo: 'https://plus.unsplash.com/premium_photo-1661663674755-690655d38912?q=80&w=300&h=200&fit=crop&crop=center',
    audioNote: null,
    timeline: [
      { status: 'submitted', date: '2024-01-12T14:20:00Z', message: 'Issue reported successfully' },
      { status: 'acknowledged', date: '2024-01-12T15:00:00Z', message: 'Acknowledged by Water Department' }
    ]
  }
];



const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-400',
  in_progress: 'bg-blue-100 text-blue-800 border-blue-400',
  resolved: 'bg-green-100 text-green-800 border-green-400',
};

const priorityStyles = {
  high: 'bg-red-100 text-red-800 border-red-400',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-400',
  low: 'bg-green-100 text-green-800 border-green-400',
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'pending': return <Clock className="h-4 w-4" />;
    case 'in_progress': return <RefreshCw className="h-4 w-4" />;
    case 'resolved': return <CheckCircle className="h-4 w-4" />;
    default: return <AlertCircle className="h-4 w-4" />;
  }
};

const TrackMyReport = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication and load user reports
  useEffect(() => {
    // Check if user is logged in (in real app, this would check JWT token or session)
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
      
      // Filter reports to show only the current user's reports
      const userReports = mockReports.filter(report => report.userId === JSON.parse(userData).id);
      setReports(userReports);
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setReports([]);
    }
  }, []);

  // Simulate live updates
  useEffect(() => {
    if (!isLoggedIn) return;
    
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // In a real app, this would fetch updated data from the server
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleRefresh = async () => {
    if (!isLoggedIn) return;
    
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setLastUpdated(new Date());
      // Re-filter reports for the current user
      const userReports = mockReports.filter(report => report.userId === user.id);
      setReports(userReports);
      setIsRefreshing(false);
    }, 1000);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'in_progress': return 'In Progress';
      case 'resolved': return 'Resolved';
      default: return status;
    }
  };

  // Show login prompt if user is not authenticated
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center mb-6"
          >
            <button 
              onClick={() => navigate(-1)} 
              className="mr-3 p-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Track My Reports</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-8 text-center"
          >
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Login Required
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You need to be logged in to view your reports. Please sign in to track your submitted issues.
              </p>
              <button
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <LogIn className="h-5 w-5" />
                Login to Continue
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)} 
              className="mr-3 p-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Track My Reports</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Welcome back, {user?.name} • Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </motion.div>

        {/* Reports List */}
        {reports.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-8 text-center"
          >
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-gray-600 dark:text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No Reports Found
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You haven't submitted any reports yet. Start by reporting an issue in your community.
              </p>
              <button
                onClick={() => navigate('/report')}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <AlertCircle className="h-5 w-5" />
                Report an Issue
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {report.details}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${statusStyles[report.status]}`}>
                        {getStatusIcon(report.status)}
                        {getStatusText(report.status)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityStyles[report.priority]}`}>
                        {report.priority.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {report.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(report.date)}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {report.reporter}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        {report.category}
                      </span>
                      {report.assignedTo && (
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                          Assigned to: {report.assignedTo}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {report.photo && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <img 
                          src={report.photo} 
                          alt="Issue" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="flex items-center gap-1 px-3 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Timeline Preview */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Recent Updates</h4>
                  <div className="space-y-2">
                    {report.timeline.slice(-2).map((update, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm">
                        <div className={`w-2 h-2 rounded-full ${
                          update.status === 'resolved' ? 'bg-green-500' :
                          update.status === 'in_progress' ? 'bg-blue-500' :
                          'bg-yellow-500'
                        }`} />
                        <span className="text-gray-600 dark:text-gray-400">
                          {formatDateTime(update.date)} - {update.message}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        )}

        {/* Report Detail Modal */}
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedReport(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Report Details
                  </h2>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Status and Priority */}
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 ${statusStyles[selectedReport.status]}`}>
                      {getStatusIcon(selectedReport.status)}
                      {getStatusText(selectedReport.status)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${priorityStyles[selectedReport.priority]}`}>
                      {selectedReport.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>

                  {/* Report Details */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedReport.details}</p>
                  </div>

                  {/* Location and Reporter */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Location</h3>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4" />
                        {selectedReport.location}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Reporter</h3>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <User className="h-4 w-4" />
                        {selectedReport.reporter} ({selectedReport.reporterEmail})
                      </div>
                    </div>
                  </div>

                  {/* Photo */}
                  {selectedReport.photo && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Photo</h3>
                      <img 
                        src={selectedReport.photo} 
                        alt="Issue" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Timeline */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Timeline</h3>
                    <div className="space-y-4">
                      {selectedReport.timeline.map((update, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className={`w-3 h-3 rounded-full mt-1 ${
                            update.status === 'resolved' ? 'bg-green-500' :
                            update.status === 'in_progress' ? 'bg-blue-500' :
                            update.status === 'acknowledged' ? 'bg-purple-500' :
                            'bg-yellow-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatDateTime(update.date)}
                            </p>
                            <p className="text-gray-900 dark:text-white">
                              {update.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TrackMyReport; 