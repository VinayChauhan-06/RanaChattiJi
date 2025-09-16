import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, MapPin, Mic, MicOff, X } from 'lucide-react';

const categories = [
  'Potholes',
  'Garbage',
  'Streetlights',
  'Water Issues',
  'Other',
];

const ReportIssue = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleUseLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(
            `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`
          );
          setLoadingLocation(false);
        },
        (error) => {
          setLocation('Unable to fetch location');
          setLoadingLocation(false);
        }
      );
    } else {
      setLocation('Geolocation not supported');
      setLoadingLocation(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      setIsRecording(false);
    }
  };

  const clearAudio = () => {
    setAudioUrl(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the data to your backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-2 py-8">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col gap-4"
        style={{ minWidth: 320 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Report a Civic Issue</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Click a photo, auto-capture location, add voice notes. Submit instantly!
        </p>
        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
          required
        >
          <option value="" disabled>Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium resize-none"
          rows={3}
          placeholder="Description..."
          required
        />
        
        {/* Voice Recording Section */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Voice Note (Optional)
          </label>
          <div className="flex items-center gap-2">
            {!isRecording && !audioUrl && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startRecording}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                <Mic className="h-4 w-4" />
                Record Voice
              </motion.button>
            )}
            
            {isRecording && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={stopRecording}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                <MicOff className="h-4 w-4" />
                Stop Recording
              </motion.button>
            )}
            
            {audioUrl && (
              <div className="flex items-center gap-2">
                <audio controls className="flex-1">
                  <source src={audioUrl} type="audio/wav" />
                </audio>
                <button
                  type="button"
                  onClick={clearAudio}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Upload Photo */}
        <label className="w-full">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg cursor-pointer mb-1"
          >
            <Upload className="h-5 w-5" />
            {photo ? photo.name : 'Upload Photo'}
          </motion.div>
        </label>
        <div className="text-center text-gray-400 font-semibold">OR</div>
        {/* Use My Current Location */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUseLocation}
          className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg mb-1"
        >
          <MapPin className="h-5 w-5" />
          {loadingLocation ? 'Fetching location...' : 'Use My Current Location'}
        </motion.button>
        {location && (
          <div className="text-xs text-blue-700 dark:text-blue-400 text-center mb-1">{location}</div>
        )}
        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg mt-2"
        >
          Submit
        </motion.button>
        {submitted && (
          <div className="text-blue-600 dark:text-blue-400 text-center font-semibold mt-2">Issue Submitted!</div>
        )}
      </motion.form>
    </div>
  );
};

export default ReportIssue; 