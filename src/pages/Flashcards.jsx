import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FlashcardViewer from '../components/FlashcardViewer';

const Flashcards = () => {
  const { chapterId } = useParams();

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to={`/chapter/${chapterId}`} className="mr-4 p-2 rounded-full hover:bg-white/50 transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Flashcard Practice 🧠
            </h1>
            <p className="text-gray-600 mt-2">
              Test your knowledge and reinforce learning! You've got this! 💪
            </p>
          </div>
        </div>

        <FlashcardViewer />
      </div>
    </div>
  );
};

export default Flashcards;