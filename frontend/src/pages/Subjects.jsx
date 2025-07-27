import React from 'react';
import { useState, useEffect } from "react"
import CreateContentModal from "../components/CreateContentModal"
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Plus  } from 'lucide-react';
import SubjectCard from '../components/SubjectCard';

const Subjects = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [subjects, setSubjects] = useState([
    { id: 1, name: 'Mathematics', emoji: '📐', chapters: 12, color: 'bg-blue-500' },
    { id: 2, name: 'Physics', emoji: '⚡', chapters: 8, color: 'bg-purple-500' },
    { id: 3, name: 'Chemistry', emoji: '🧪', chapters: 10, color: 'bg-green-500' },
    { id: 4, name: 'Biology', emoji: '🧬', chapters: 15, color: 'bg-orange-500' },
    { id: 5, name: 'History', emoji: '📚', chapters: 6, color: 'bg-red-500' },
    { id: 6, name: 'Literature', emoji: '📖', chapters: 9, color: 'bg-indigo-500' },
  ]);

  const handleContentAdded = (newContent) => {
    // Add the new subject to the list
    const newSubject = {
      id: newContent.id,
      name: newContent.name,
      emoji: '📄', // Default emoji for new subjects
      chapters: 1, // Default chapters count
      color: 'bg-gray-500' // Default color
    };
    
    setSubjects([...subjects, newSubject]);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/" className="mr-4 p-2 rounded-full hover:bg-white/50 transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Your Subjects 📚
              </h1>
              <p className="text-gray-600 mt-2">
                You're crushing it! Pick a subject to dive deeper 💪
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-md transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Subject
          </button>
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