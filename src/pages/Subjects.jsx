import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SubjectCard from '../components/SubjectCard';

const Subjects = () => {
  // Mock data - in real app, this would come from backend
  const subjects = [
    { id: 1, name: 'Mathematics', emoji: '📐', chapters: 12, color: 'bg-blue-500' },
    { id: 2, name: 'Physics', emoji: '⚡', chapters: 8, color: 'bg-purple-500' },
    { id: 3, name: 'Chemistry', emoji: '🧪', chapters: 10, color: 'bg-green-500' },
    { id: 4, name: 'Biology', emoji: '🧬', chapters: 15, color: 'bg-orange-500' },
    { id: 5, name: 'History', emoji: '📚', chapters: 6, color: 'bg-red-500' },
    { id: 6, name: 'Literature', emoji: '📖', chapters: 9, color: 'bg-indigo-500' },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/upload" className="mr-4 p-2 rounded-full hover:bg-white/50 transition-colors">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">
            Ready to become a learning superstar? Let's go! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subjects;