import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ChapterCard from '../components/ChapterCard';

const Chapters = () => {
  const { subjectId } = useParams();
  
  // Mock data - in real app, this would be fetched based on subjectId
  const subjectNames = {
    1: 'Mathematics 📐',
    2: 'Physics ⚡',
    3: 'Chemistry 🧪',
    4: 'Biology 🧬',
    5: 'History 📚',
    6: 'Literature 📖'
  };

  const chapters = [
    { id: 1, title: 'Introduction to Algebra', preview: 'Learn the basics of algebraic expressions and equations...', duration: '15 min read', difficulty: 'Beginner' },
    { id: 2, title: 'Linear Equations', preview: 'Master solving linear equations in one and two variables...', duration: '20 min read', difficulty: 'Intermediate' },
    { id: 3, title: 'Quadratic Functions', preview: 'Explore parabolas, vertex form, and factoring techniques...', duration: '25 min read', difficulty: 'Intermediate' },
    { id: 4, title: 'Polynomials', preview: 'Understand polynomial operations and graphing methods...', duration: '18 min read', difficulty: 'Advanced' },
    { id: 5, title: 'Logarithms', preview: 'Discover logarithmic functions and their applications...', duration: '22 min read', difficulty: 'Advanced' },
    { id: 6, title: 'Trigonometry Basics', preview: 'Introduction to sine, cosine, and tangent functions...', duration: '30 min read', difficulty: 'Intermediate' },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/subjects" className="mr-4 p-2 rounded-full hover:bg-white/50 transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {subjectNames[subjectId] || 'Subject Chapters'}
            </h1>
            <p className="text-gray-600 mt-2">
              Choose a chapter to start your learning journey! ✨
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>

        <div className="text-center mt-12 bg-white rounded-2xl p-8 shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            You're doing amazing! 🌟
          </h3>
          <p className="text-gray-600">
            Each chapter brings you closer to mastery. Keep up the fantastic work! 💪
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chapters;