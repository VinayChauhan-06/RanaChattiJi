import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Eye,
  MessageCircle,
  ThumbsUp,
  Search,
  X, // Added for closing modal
  Send, // Added for submitting comments
} from 'lucide-react';

// --- Initial Data (Enhanced with a comments array) ---
const initialIssues = [
  {
    id: 1,
    category: 'Garbage',
    title: 'Overflowing Garbage Bins near Kargi Chowk',
    description: 'Multiple garbage bins near Kargi Chowk are overflowing for several days, creating unhygienic conditions and a foul smell that is affecting local businesses and residents.',
    image: 'https://images.unsplash.com/photo-1558497513-f0133e055abf?q=80&w=400&h=300&fit=crop&crop=center',
    status: 'in_progress',
    priority: 'high',
    location: 'Kargi Chowk, Dehradun',
    reportedBy: 'Local Residents',
    reportCount: 12,
    views: 210,
    likeCount: 40, // Renamed from 'likes'
    commentCount: 2, // Renamed from 'comments'
    reportedDate: '2024-09-10',
    lastUpdate: '2024-09-12',
    assignedTo: 'Sanitation Dept',
    progress: 60,
    tags: ['Sanitation', 'Public Health', 'Kargi Chowk'],
    updates: [
      { date: '2024-09-10', message: 'Issue reported by residents', status: 'reported' },
      { date: '2024-09-11', message: 'Acknowledged by Sanitation Dept', status: 'acknowledged' },
      { date: '2024-09-12', message: 'Cleaning scheduled and temporary bins added', status: 'in_progress' }
    ],
    comments: [ // Added for interactive comments
      { user: 'Amit S.', text: 'This is a serious health hazard! Needs urgent attention.' },
      { user: 'Priya K.', text: 'My shop is right here, and the smell is unbearable. Please hurry.' },
    ]
  },
  {
    id: 2,
    category: 'Potholes',
    title: 'Potholes on ISBT Road causing traffic issues',
    description: 'Large potholes on ISBT Road are causing traffic congestion and minor vehicle damage, especially during peak hours. Two-wheelers are at high risk.',
    image: 'https://images.unsplash.com/photo-1714773550445-e4c3d6d80196?q=80&w=400&h=300&fit=crop&crop=center',
    status: 'pending',
    priority: 'high',
    location: 'ISBT, Dehradun',
    reportedBy: 'Commuters Association',
    reportCount: 10,
    views: 180,
    likeCount: 35,
    commentCount: 1,
    reportedDate: '2024-09-08',
    lastUpdate: '2024-09-09',
    assignedTo: 'Roads Department',
    progress: 25,
    tags: ['Roads', 'Traffic', 'ISBT'],
    updates: [
      { date: '2024-09-08', message: 'Reported by commuters', status: 'reported' },
      { date: '2024-09-09', message: 'Acknowledged by Roads Dept', status: 'acknowledged' }
    ],
    comments: [
      { user: 'Rohan V.', text: 'My bike almost skidded here yesterday. Very dangerous!' }
    ]
  },
  {
    id: 3,
    category: 'Streetlights',
    title: 'Streetlights not working near Clock Tower',
    description: 'Several streetlights near Clock Tower are not functioning, causing safety concerns for pedestrians and businesses at night.',
    image: 'https://th-i.thgim.com/public/migration_catalog/article14606763.ece/alternates/LANDSCAPE_1200/07BG_STREET_LIGHTS__BASAVANAGUDI',
    status: 'resolved',
    priority: 'medium',
    location: 'Clock Tower, Dehradun',
    reportedBy: 'Shopkeepers Association',
    reportCount: 8,
    views: 150,
    likeCount: 25,
    commentCount: 1,
    reportedDate: '2024-09-01',
    lastUpdate: '2024-09-05',
    assignedTo: 'Electricity Dept',
    progress: 100,
    tags: ['Safety', 'Electricity', 'Clock Tower'],
    updates: [
      { date: '2024-09-01', message: 'Reported by shopkeepers', status: 'reported' },
      { date: '2024-09-02', message: 'Acknowledged by Electricity Dept', status: 'acknowledged' },
      { date: '2024-09-03', message: 'Repair crew dispatched', status: 'in_progress' },
      { date: '2024-09-05', message: 'All streetlights repaired', status: 'resolved' }
    ],
    comments: [
      { user: 'Shalini G.', text: 'Thank you for the quick resolution!' }
    ]
  },
  {
    id: 4,
    category: 'Water Issues',
    title: 'Water Leakage in Dharmpur Residential Area',
    description: 'A major water pipe has been leaking in Dharmpur for three days, creating muddy patches on the road and wasting a significant amount of clean water.',
    image: 'https://images.unsplash.com/photo-1722755860991-5faa6575fb39?q=80&w=400&h=300&fit=crop&crop=center',
    status: 'in_progress',
    priority: 'medium',
    location: 'Dharmpur, Dehradun',
    reportedBy: 'Local Residents',
    reportCount: 5,
    views: 100,
    likeCount: 12,
    commentCount: 0,
    reportedDate: '2024-09-05',
    lastUpdate: '2024-09-08',
    assignedTo: 'Water Department',
    progress: 40,
    tags: ['Water', 'Dharmpur', 'Infrastructure'],
    updates: [
      { date: '2024-09-05', message: 'Reported by residents', status: 'reported' },
      { date: '2024-09-06', message: 'Acknowledged by Water Dept', status: 'acknowledged' },
      { date: '2024-09-08', message: 'Repair scheduled', status: 'in_progress' }
    ],
    comments: []
  }
];


// --- Helper Constants & Functions ---
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

const TrendingIssue = () => {
  const [issues, setIssues] = useState(initialIssues); // Main state for issues
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [likedIssues, setLikedIssues] = useState(new Set()); // Tracks liked issues
  const [newComment, setNewComment] = useState(''); // State for new comment input

  useEffect(() => {
    let processedIssues = [...issues];

    // Filter by status
    if (filter !== 'all') {
      processedIssues = processedIssues.filter(issue => issue.status === filter);
    }

    // Filter by search term
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      processedIssues = processedIssues.filter(issue => 
        issue.title.toLowerCase().includes(lowercasedTerm) ||
        issue.description.toLowerCase().includes(lowercasedTerm) ||
        issue.category.toLowerCase().includes(lowercasedTerm) ||
        issue.location.toLowerCase().includes(lowercasedTerm)
      );
    }

    // Sort issues
    switch (sortBy) {
      case 'trending':
        // **NEW**: Trending score based on views, likes, and comments
        processedIssues.sort((a, b) => {
          const scoreA = a.views * 0.2 + a.likeCount * 0.5 + a.commentCount * 0.3;
          const scoreB = b.views * 0.2 + b.likeCount * 0.5 + b.commentCount * 0.3;
          return scoreB - scoreA;
        });
        break;
      case 'recent':
        processedIssues.sort((a, b) => new Date(b.reportedDate) - new Date(a.reportedDate));
        break;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        processedIssues.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        break;
      case 'progress':
        processedIssues.sort((a, b) => b.progress - a.progress);
        break;
      default:
        break;
    }

    setFilteredIssues(processedIssues);
  }, [filter, searchTerm, sortBy, issues]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const getStatusText = (status) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // --- INTERACTION HANDLERS ---
  const handleLike = (issueId) => {
    const newLikedIssues = new Set(likedIssues);
    let likeAdjustment = 0;

    if (newLikedIssues.has(issueId)) {
      newLikedIssues.delete(issueId);
      likeAdjustment = -1;
    } else {
      newLikedIssues.add(issueId);
      likeAdjustment = 1;
    }
    setLikedIssues(newLikedIssues);

    // Update the main issues state to reflect the new like count
    setIssues(prevIssues => 
      prevIssues.map(issue =>
        issue.id === issueId
          ? { ...issue, likeCount: issue.likeCount + likeAdjustment }
          : issue
      )
    );
  };
  
  const handleAddComment = (issueId) => {
    if (!newComment.trim()) return;

    const updatedIssues = issues.map(issue => {
      if (issue.id === issueId) {
        const newCommentObj = { user: 'You', text: newComment };
        return {
          ...issue,
          commentCount: issue.commentCount + 1,
          comments: [...issue.comments, newCommentObj],
        };
      }
      return issue;
    });
    setIssues(updatedIssues);
    // Also update the 'selected' issue in the modal to show the new comment instantly
    setSelected(prev => ({
      ...prev,
      commentCount: prev.commentCount + 1,
      comments: [...prev.comments, { user: 'You', text: newComment }],
    }));
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Community Issue Feed
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your hub for viewing, discussing, and trending local civic issues.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="sticky top-4 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md p-4 mb-6 max-w-2xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by title, location, category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex gap-2 justify-center">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="trending">🔥 Trending</option>
                <option value="recent">✨ Most Recent</option>
                <option value="priority">❗ Priority</option>
                <option value="progress">📊 Progress</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Issues Feed - **NEW LAYOUT** */}
        <div className="max-w-2xl mx-auto space-y-6">
          {filteredIssues.map((issue, index) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              layout
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="font-bold text-gray-800 dark:text-white">{issue.category}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Reported by {issue.reportedBy}
                  </p>
                </div>
                 <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${statusStyles[issue.status]}`}>
                   {getStatusIcon(issue.status)}
                   {getStatusText(issue.status)}
                 </span>
              </div>
              
              {/* Card Image */}
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-64 object-cover"
              />

              {/* Card Body */}
              <div className="p-4">
                {/* Action Bar */}
                <div className="flex items-center gap-4 mb-3">
                  <button onClick={() => handleLike(issue.id)} className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors group">
                     <ThumbsUp className={`h-5 w-5 group-hover:scale-110 transition-transform ${likedIssues.has(issue.id) ? 'text-red-500 fill-red-200' : ''}`} />
                     <span className="font-semibold text-sm">{issue.likeCount}</span>
                  </button>
                  <button onClick={() => setSelected(issue)} className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 transition-colors group">
                    <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform"/>
                    <span className="font-semibold text-sm">{issue.commentCount} Comments</span>
                  </button>
                </div>

                {/* Title and Description */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{issue.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{issue.description}</p>

                {/* Location and Date */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1"><MapPin size={14} /> {issue.location}</div>
                  <div className="flex items-center gap-1"><Calendar size={14} /> {formatDate(issue.reportedDate)}</div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Progress ({issue.assignedTo})</span>
                    <span className="font-bold">{issue.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${issue.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${issue.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Issue Detail Modal - **ENHANCED with Comments** */}
        <AnimatePresence>
        {selected && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selected.title}</h2>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-6 overflow-y-auto space-y-6">
                <img src={selected.image} alt={selected.title} className="w-full h-64 object-cover rounded-lg" />
                <p className="text-gray-700 dark:text-gray-300">{selected.description}</p>
                
                {/* Timeline */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Timeline</h3>
                  <div className="border-l-2 border-gray-200 dark:border-gray-600 ml-1 space-y-4">
                    {selected.updates.map((update, idx) => (
                      <div key={idx} className="relative flex items-start gap-4 pl-6">
                        <div className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full ${update.status === 'resolved' ? 'bg-green-500' : 'bg-blue-500'}`} />
                        <div>
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{formatDate(update.date)}</p>
                          <p className="text-sm text-gray-800 dark:text-white">{update.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Comments Section */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Comments ({selected.commentCount})</h3>
                  <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
                    {selected.comments.length > 0 ? selected.comments.map((comment, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                         <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center font-bold text-sm text-gray-500 dark:text-gray-400">
                           {comment.user.charAt(0)}
                         </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg flex-1">
                          <p className="font-semibold text-sm text-gray-800 dark:text-white">{comment.user}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{comment.text}</p>
                        </div>
                      </div>
                    )) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer - Add Comment Form */}
              <div className="p-4 border-t dark:border-gray-700 mt-auto">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment(selected.id)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <button onClick={() => handleAddComment(selected.id)} className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed" disabled={!newComment.trim()}>
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TrendingIssue;