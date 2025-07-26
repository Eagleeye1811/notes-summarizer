import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Headphones, Brain, Star } from 'lucide-react';
import SummaryCard from '../components/SummaryCard';

const ChapterDetail = () => {
  const { chapterId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock chapter data
  const chapter = {
    id: chapterId,
    title: 'Introduction to Algebra',
    summary: `Algebra is a branch of mathematics that uses symbols and letters to represent numbers and quantities in formulas and equations. 

**Key Concepts:**
- Variables: Letters (like x, y, z) that represent unknown numbers
- Constants: Fixed numbers that don't change
- Expressions: Combinations of variables and constants (like 3x + 5)
- Equations: Mathematical statements that show two expressions are equal

**Basic Operations:**
1. Addition and Subtraction of like terms
2. Multiplication and Division of variables
3. Solving for unknown variables
4. Simplifying complex expressions

**Real-world Applications:**
Algebra helps us solve practical problems like calculating distances, determining costs, and analyzing data patterns. It's the foundation for advanced mathematics and many careers in science, engineering, and technology.

**Practice Tips:**
- Start with simple problems and gradually increase complexity
- Always check your answers by substituting back
- Look for patterns in similar problems
- Don't be afraid to make mistakes - they're part of learning!

Remember, every mathematician started where you are now. You've got this! 💪`,
    difficulty: 'Beginner',
    duration: '15 min read'
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/chapters/1" className="mr-4 p-2 rounded-full hover:bg-white/50 transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {chapter.title}
            </h1>
            <p className="text-gray-600 mt-2">
              Let's learn something cool today! 🌟
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SummaryCard summary={chapter.summary} isLoading={isLoading} />
          </div>
          
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
                  <Headphones className="w-5 h-5 mr-2" />
                  Listen to Audio 🎧
                </button>
                
                <Link 
                  to={`/flashcards/${chapterId}`}
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
              <h3 className="font-semibold text-gray-800 mb-3">Chapter Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Difficulty:</span>
                  <span className="font-medium">{chapter.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{chapter.duration}</span>
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
    </div>
  );
};

export default ChapterDetail;