import React from 'react';
import { useState, useEffect } from "react"
import CreateContentModal from "../components/CreateContentModal"
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Plus, TrendingUp, Target } from 'lucide-react';
import SubjectCard from '../components/SubjectCard';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';

const Subjects = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [subjects, setSubjects] = useState([
    { id: 1, name: 'Mathematics', emoji: '📐', chapters: 12, color: 'bg-blue-500', points: 850, accuracy: 85 },
    { id: 2, name: 'Physics', emoji: '⚡', chapters: 8, color: 'bg-purple-500', points: 720, accuracy: 78 },
    { id: 3, name: 'Chemistry', emoji: '🧪', chapters: 10, color: 'bg-green-500', points: 650, accuracy: 72 },
    { id: 4, name: 'Biology', emoji: '🧬', chapters: 15, color: 'bg-orange-500', points: 920, accuracy: 88 },
    { id: 5, name: 'History', emoji: '📚', chapters: 6, color: 'bg-red-500', points: 580, accuracy: 68 },
    { id: 6, name: 'Literature', emoji: '📖', chapters: 9, color: 'bg-indigo-500', points: 750, accuracy: 82 },
  ]);

  // Mock quiz data for line chart
  const quizData = [
    { test: 'Quiz 1', score: 85, date: 'Week 1' },
    { test: 'Quiz 2', score: 78, date: 'Week 2' },
    { test: 'Quiz 3', score: 92, date: 'Week 3' },
    { test: 'Quiz 4', score: 88, date: 'Week 4' },
    { test: 'Quiz 5', score: 95, date: 'Week 5' },
  ];

  // Calculate total XP
  const totalXP = subjects.reduce((sum, subject) => sum + subject.points, 0);

  const handleContentAdded = (newContent) => {
    // Add the new subject to the list
    const newSubject = {
      id: newContent.id,
      name: newContent.name,
      emoji: '📄', // Default emoji for new subjects
      chapters: 1, // Default chapters count
      color: 'bg-gray-500', // Default color
      points: 0, // Default points
      accuracy: 0 // Default accuracy
    };
    
    setSubjects([...subjects, newSubject]);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/" className="mr-4 p-2 rounded-full hover:bg-white/50 transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome Back, Prakhar!
              </h1>
              <p className="text-gray-600 mt-2">
                Keep up the amazing progress! 🚀
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-md transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Content
            </button>
            <div className="flex items-center bg-black text-white px-4 py-2 rounded-full">
              <Target className="w-4 h-4 mr-2" />
              <span className="font-bold">{totalXP} XP</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <LineChart quizData={quizData} />
          <PieChart subjects={subjects} />
        </div>

        {/* Subjects Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
           📚 Your Subjects 
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>

        <CreateContentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onContentAdded={handleContentAdded}
        />
      </div>
    </div>
  );
};

export default Subjects;