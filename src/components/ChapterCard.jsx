import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BarChart3, Headphones, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const ChapterCard = ({ chapter }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.98 }}
      className="group"
    >
      <Link to={`/chapter/${chapter.id}`}>
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-purple-400">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
              {chapter.title}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(chapter.difficulty)}`}>
              {chapter.difficulty}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4 leading-relaxed">
            {chapter.preview}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {chapter.duration}
            </div>
            <div className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-1" />
              {chapter.difficulty}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium"
            >
              <Headphones className="w-3 h-3 mr-1" />
              Audio
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium"
            >
              <Brain className="w-3 h-3 mr-1" />
              Flashcards
            </motion.div>
          </div>
          
          <motion.div
            className="mt-4 text-center text-xs text-gray-400"
            whileHover={{ scale: 1.05 }}
          >
            Click to start learning! 🚀
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ChapterCard;