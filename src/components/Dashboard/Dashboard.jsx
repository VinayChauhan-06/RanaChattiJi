import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Corrected: Replaced FaX with FaTimes and added FaDownload for the new feature
import { 
  FaEye, 
  FaCheckCircle, 
  FaClock, 
  FaExclamationTriangle, 
  FaSearch,
  FaDownload,
  FaEdit,
  FaTimes // Correct icon for 'X'
} from 'react-icons/fa';
// Added papaparse for CSV export
import Papa from 'papaparse';

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockIssues = [
      {
        id: 1,
        title: "Pothole near Kargi Chowk",
        description: "Deep pothole making it difficult for two-wheelers to pass safely.",
        category: "Potholes",
        status: "pending",
        priority: "high",
        location: "Kargi Chowk, Dehradun",
        coordinates: "30.2820, 78.0080",
        reporter: "Rohit Negi",
        reporterEmail: "rohit.negi@example.com",
        reportedDate: "2025-09-10",
        assignedTo: null,
       photo: 'https://images.unsplash.com/photo-1714773550445-e4c3d6d80196?q=80&w=400&h=300&fit=crop&crop=center',
        audioNote: null
      },
      {
        id: 2,
        title: "Overflowing garbage bin near ISBT",
        description: "Garbage spilling on the road, attracting stray animals.",
        category: "Garbage",
        status: "in_progress",
        priority: "medium",
        location: "ISBT, Dehradun",
        coordinates: "30.2859, 78.0047",
        reporter: "Priya Rawat",
        reporterEmail: "priya.rawat@example.com",
        reportedDate: "2025-09-09",
        assignedTo: "Sanitation Dept",
        photo: 'https://images.unsplash.com/photo-1558497513-f0133e055abf?q=80&w=400&h=300&fit=crop&crop=center',
        audioNote: null
      },
      {
        id: 3,
        title: "Streetlight not working in Patel Nagar",
        description: "Entire stretch dark at night, unsafe for pedestrians.",
        category: "Streetlights",
        status: "resolved",
        priority: "medium",
        location: "Patel Nagar, Dehradun",
        coordinates: "30.3007, 78.0212",
        reporter: "Ankit Joshi",
        reporterEmail: "ankit.joshi@example.com",
        reportedDate: "2025-09-07",
        assignedTo: "Electricity Dept",
        photo:  'https://th-i.thgim.com/public/migration_catalog/article14606763.ece/alternates/LANDSCAPE_1200/07BG_STREET_LIGHTS__BASAVANAGUDI',
        // "https://images.unsplash.com/photo-1600359754908-96ed9a0a5096?w=400&h=250&fit=crop&crop=center", 
        audioNote: null
      },
      {
        id: 4,
        title: "Water leakage near Clock Tower",
        description: "Pipeline leakage flooding one side of the road.",
        category: "Water Supply",
        status: "pending",
        priority: "high",
        location: "Clock Tower, Dehradun",
        coordinates: "30.3244, 78.0419",
        reporter: "Megha Thakur",
        reporterEmail: "megha.thakur@example.com",
        reportedDate: "2025-09-08",
        assignedTo: null,
        photo: "https://bestplumbers.com.au/wp-content/uploads/2020/06/find-water-leak-847x470.jpg", 
        audioNote: null
      },
      {
        id: 5,
        title: "Illegal parking at Rajpur Road",
        description: "Cars parked on both sides causing traffic jams.",
        category: "Traffic",
        status: "in_progress",
        priority: "medium",
        location: "Rajpur Road, Dehradun",
        coordinates: "30.3560, 78.0770",
        reporter: "Aman Singh",
        reporterEmail: "aman.singh@example.com",
        reportedDate: "2025-09-06",
        assignedTo: "Traffic Police Dept",
        photo: "https://images.bhaskarassets.com/webp/thumb/512x0/web2images/1884/2025/01/12/164003634621metbabourn-rd25c_1736663827.jpg", 
        audioNote: null
      }
    ];

    setIssues(mockIssues);
  }, []);

  // Filter, search, and stats calculation
  useEffect(() => {
    let filtered = issues;

    if (filter !== 'all') {
      filtered = filtered.filter(issue => issue.status === filter);
    }

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(issue => 
        issue.title.toLowerCase().includes(lowercasedTerm) ||
        issue.description.toLowerCase().includes(lowercasedTerm) ||
        issue.category.toLowerCase().includes(lowercasedTerm) ||
        issue.reporter.toLowerCase().includes(lowercasedTerm)
      );
    }

    setFilteredIssues(filtered);

    // Recalculate stats whenever the main issues list changes
    setStats({
      total: issues.length,
      pending: issues.filter(issue => issue.status === 'pending').length,
      inProgress: issues.filter(issue => issue.status === 'in_progress').length,
      resolved: issues.filter(issue => issue.status === 'resolved').length
    });
  }, [issues, filter, searchTerm]);

  const handleStatusChange = (issueId, newStatus) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId ? { ...issue, status: newStatus } : issue
    ));
  };

  const handleAssign = (issueId, assignee) => {
    if (!assignee) return;
    setIssues(prev => prev.map(issue => 
      issue.id === issueId ? { ...issue, assignedTo: assignee, status: 'in_progress' } : issue
    ));
  };

  // New function to handle CSV download
  const handleDownloadCsv = () => {
    const csv = Papa.unparse(filteredIssues);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'civic_issues_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/50';
      case 'in_progress': return 'text-blue-600 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/50';
      case 'resolved': return 'text-green-600 bg-green-100 dark:text-green-300 dark:bg-green-900/50';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900/50';
      case 'medium': return 'text-orange-600 bg-orange-100 dark:text-orange-300 dark:bg-orange-900/50';
      case 'low': return 'text-green-600 bg-green-100 dark:text-green-300 dark:bg-green-900/50';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Government Staff Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View, assign, and resolve civic issues reported by citizens.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Stat Card Component could be abstracted, but shown inline for clarity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Issues</p>
                <p className="text-3xl font-semibold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50">
                <FaExclamationTriangle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-3xl font-semibold text-gray-900 dark:text-white">{stats.pending}</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/50">
                <FaClock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                <p className="text-3xl font-semibold text-gray-900 dark:text-white">{stats.inProgress}</p>
              </div>
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/50">
                <FaEdit className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolved</p>
                <p className="text-3xl font-semibold text-gray-900 dark:text-white">{stats.resolved}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50">
                <FaCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, category, reporter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="flex w-full md:w-auto items-center gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <button
                onClick={handleDownloadCsv}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaDownload className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Issues Table */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto"
        >
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Issue</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Reporter</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Status</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Priority</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Date</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredIssues.map((issue) => (
                <motion.tr
                  key={issue.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                >
                  <td className="p-4">
                    <div className="font-semibold text-gray-900 dark:text-white">{issue.title}</div>
                    <div className="text-sm text-gray-500">{issue.category}</div>
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">{issue.reporter}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                      {issue.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">{issue.reportedDate}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelectedIssue(issue)} className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors" aria-label="View Details">
                        <FaEye className="h-5 w-5" />
                      </button>
                      {issue.status === 'pending' && (
                        <select
                          onChange={(e) => handleAssign(issue.id, e.target.value)}
                          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-700 dark:text-white"
                          aria-label="Assign Department"
                        >
                          <option value="">Assign to...</option>
                          <option value="Sanitation Dept">Sanitation</option>
                          <option value="Roads Dept">Roads</option>
                          <option value="Electricity Dept">Electricity</option>
                          <option value="Water Dept">Water</option>
                          <option value="Traffic Police Dept">Traffic</option>
                        </select>
                      )}
                      {issue.status === 'in_progress' && (
                        <button onClick={() => handleStatusChange(issue.id, 'resolved')} className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                          Resolve
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Issue Detail Modal */}
        {selectedIssue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedIssue(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Issue Details
                  </h2>
                  <button onClick={() => setSelectedIssue(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <FaTimes className="h-6 w-6" /> {/* Corrected Icon */}
                  </button>
                </div>
                
                <div className="space-y-4">
                  {selectedIssue.photo && (
                    <div>
                      <img 
                        src={selectedIssue.photo} 
                        alt="Issue" 
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-500 dark:text-gray-400">Title</h3>
                      <p className="text-gray-900 dark:text-white">{selectedIssue.title}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-500 dark:text-gray-400">Category</h3>
                      <p className="text-gray-900 dark:text-white">{selectedIssue.category}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-500 dark:text-gray-400">Status</h3>
                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedIssue.status)}`}>
                        {selectedIssue.status.replace('_', ' ')}
                      </span>
                    </div>
                     <div>
                      <h3 className="font-semibold text-gray-500 dark:text-gray-400">Priority</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedIssue.priority)}`}>
                        {selectedIssue.priority}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-500 dark:text-gray-400">Description</h3>
                    <p className="text-gray-900 dark:text-white">{selectedIssue.description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-500 dark:text-gray-400">Location</h3>
                    <p className="text-gray-900 dark:text-white">{selectedIssue.location}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-500 dark:text-gray-400">Reporter</h3>
                    <p className="text-gray-900 dark:text-white">{selectedIssue.reporter} ({selectedIssue.reporterEmail})</p>
                  </div>
                   {selectedIssue.assignedTo && (
                    <div>
                      <h3 className="font-semibold text-gray-500 dark:text-gray-400">Assigned To</h3>
                      <p className="text-gray-900 dark:text-white">{selectedIssue.assignedTo}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;