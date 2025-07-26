import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AudioPlayer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);

  // This would be triggered when user clicks audio button
  React.useEffect(() => {
    // Auto-show player when audio is available
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="bg-white rounded-2xl shadow-lg p-4 w-80 border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-sm">
                  🎧 Introduction to Algebra
                </h4>
                <p className="text-xs text-gray-500">Chapter Audio Summary</p>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600 text-xs"
              >
                ✕
              </button>
            </div>
            
            <div className="flex items-center space-x-3 mb-3">
              <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <SkipBack className="w-4 h-4" />
              </button>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </motion.button>
              
              <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <SkipForward className="w-4 h-4" />
              </button>
              
              <div className="flex-1 mx-3">
                <div className="bg-gray-200 rounded-full h-1">
                  <motion.div
                    className="bg-purple-600 h-1 rounded-full"
                    style={{ width: `${progress}%` }}
                    animate={{ width: isPlaying ? `${Math.min(progress + 1, 100)}%` : `${progress}%` }}
                    transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
                  />
                </div>
              </div>
              
              <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>2:30</span>
              <span>10:15</span>
            </div>
            
            {isPlaying && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-purple-600 mt-2 text-center"
              >
                🎵 Playing your personalized audio summary...
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AudioPlayer;