import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Upload, Headphones, Brain, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block text-6xl mb-4"
          >
            🌟
          </motion.div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-purple-600">StudyBuddy</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your lovable AI-powered study companion! 📚✨
          </p>
          <p className="text-lg text-gray-500 mb-12">
            Upload your PDFs, get instant summaries, listen to audio, and ace your studies! 💪
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 mb-2">Upload PDFs</h3>
            <p className="text-sm text-gray-600">Drag & drop your study materials</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <BookOpen className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 mb-2">Smart Summaries</h3>
            <p className="text-sm text-gray-600">Get chapter-wise summaries instantly</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <Headphones className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 mb-2">Audio Learning</h3>
            <p className="text-sm text-gray-600">Listen while you walk or relax</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <Brain className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 mb-2">Flashcards & Quiz</h3>
            <p className="text-sm text-gray-600">Test your knowledge interactively</p>
          </motion.div>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/upload"
            className="inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:bg-purple-700 transition-colors"
          >
            <Star className="w-6 h-6 mr-2" />
            Let's start learning! 🚀
          </Link>
        </motion.div>

        <p className="text-sm text-gray-500 mt-6">
          Ready to crush your studies? We're here to help! 💖
        </p>
      </motion.div>
    </div>
  );
};

export default LandingPage;