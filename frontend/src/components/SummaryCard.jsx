import React from 'react';
import { motion } from 'framer-motion';
import Markdown from "react-markdown";
const SummaryCard = ({ summary, isLoading }) => {



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-md p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Subject Summary
        </h2>
      </div>
      
      {isLoading ? (
        <div>
          <div className="flex items-center mb-4 text-purple-600">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent mr-2"></div>
            <span className="text-sm font-medium">Creating your personalized summary...</span>
          </div>

        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="prose prose-lg max-w-none"
        >
          <Markdown>{summary}</Markdown>
          
          
        </motion.div>
      )}
    </motion.div>
  );
};

export default SummaryCard;