import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Headphones, Brain, Star } from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import AudioPlayer from '../components/AudioPlayer';

const SubjectDetail = () => {
  const { subjectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  
  // Mock subject data
  const subject = {
    id: subjectId,
    title: 'Mathematics',
    summary: `Mathematics is a fundamental subject that develops logical thinking and problem-solving skills. 

**Key Concepts:**
- Numbers and Operations: Understanding basic arithmetic and number systems
- Algebra: Working with variables, equations, and mathematical expressions
- Geometry: Studying shapes, sizes, and spatial relationships
- Statistics: Analyzing and interpreting data

**Core Skills:**
1. Critical thinking and logical reasoning
2. Pattern recognition and problem-solving
3. Mathematical modeling and abstraction
4. Data analysis and interpretation

**Real-world Applications:**
Mathematics is essential in everyday life, from budgeting and shopping to understanding statistics in the news. It's the foundation for careers in science, engineering, finance, technology, and many other fields.

**Study Tips:**
- Practice regularly with different types of problems
- Understand concepts before memorizing formulas
- Connect mathematical ideas to real-world situations
- Don't be afraid to make mistakes - they're part of learning!

Remember, mathematics is a language that helps us understand the world around us. You've got this! 💪`,
    difficulty: 'Beginner',
    duration: '20 min read'
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAudioClick = () => {
    setShowAudioPlayer(true);
  };

  const handleCloseAudio = () => {
    setShowAudioPlayer(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/dashboard" className="mr-4 p-2 rounded-full hover:bg-white/50 transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {subject.title}
            </h1>
            <p className="text-gray-600 mt-2">
              Let's learn something cool today! 🌟
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SummaryCard summary={subject.summary} isLoading={isLoading} />
          </div>
          
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button 
                  onClick={handleAudioClick}
                  className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  <Headphones className="w-5 h-5 mr-2" />
                  Listen to Audio 🎧
                </button>
                
                <Link 
                  to={`/flashcards/${subjectId}`}
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Practice Flashcards 🧠
                </Link>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-md p-6">
              <div className="flex items-center mb-3">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                <h3 className="font-semibold text-gray-800">Study Tip</h3>
              </div>
              <p className="text-sm text-gray-700">
                Take breaks every 25 minutes to keep your brain fresh. You're doing great! ✨
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-semibold text-gray-800 mb-3">Subject Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Difficulty:</span>
                  <span className="font-medium">{subject.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{subject.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Progress:</span>
                  <span className="font-medium text-green-600">Reading... 📖</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render AudioPlayer when showAudioPlayer is true */}
      {showAudioPlayer && <AudioPlayer onClose={handleCloseAudio} />}
    </div>
  );
};

export default SubjectDetail; 