import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FlashcardViewer = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  // Mock flashcard data
  const flashcards = [
    {
      id: 1,
      question: "What is a variable in algebra?",
      answer: "A variable is a letter or symbol (like x, y, or z) that represents an unknown number or value that can change."
    },
    {
      id: 2,
      question: "What is the difference between an expression and an equation?",
      answer: "An expression is a mathematical phrase with numbers and variables (like 3x + 5), while an equation shows that two expressions are equal (like 3x + 5 = 20)."
    },
    {
      id: 3,
      question: "How do you solve for x in the equation 2x + 6 = 14?",
      answer: "Subtract 6 from both sides: 2x = 8, then divide both sides by 2: x = 4"
    },
    {
      id: 4,
      question: "What are 'like terms' in algebra?",
      answer: "Like terms are terms that have the same variable raised to the same power. For example, 3x and 5x are like terms, but 3x and 3x² are not."
    }
  ];

  const nextCard = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const handleAnswer = (isCorrect) => {
    setScore(prev => ({
      ...prev,
      [isCorrect ? 'correct' : 'incorrect']: prev[isCorrect ? 'correct' : 'incorrect'] + 1
    }));
    
    setTimeout(() => {
      nextCard();
    }, 1000);
  };

  const resetCards = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setScore({ correct: 0, incorrect: 0 });
  };

  const currentFlashcard = flashcards[currentCard];

  return (
    <div className="space-y-6">
      {/* Progress and Score */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Card {currentCard + 1} of {flashcards.length}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">{score.correct}</span>
          </div>
          <div className="flex items-center text-red-600">
            <XCircle className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">{score.incorrect}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-purple-600 h-2 rounded-full"
          animate={{ width: `${((currentCard + 1) / flashcards.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Flashcard */}
      <div className="flex justify-center">
        <motion.div
          className="relative w-full max-w-2xl h-80 cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence>
            <motion.div
              key={isFlipped ? 'answer' : 'question'}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 rounded-2xl shadow-lg p-8 flex items-center justify-center text-center ${
                isFlipped 
                  ? 'bg-gradient-to-br from-green-400 to-green-600 text-white' 
                  : 'bg-gradient-to-br from-purple-400 to-purple-600 text-white'
              }`}
            >
              <div>
                <div className="text-sm font-medium mb-4 opacity-80">
                  {isFlipped ? 'Answer' : 'Question'}
                </div>
                <p className="text-xl font-semibold leading-relaxed">
                  {isFlipped ? currentFlashcard.answer : currentFlashcard.question}
                </p>
                <div className="mt-6 text-sm opacity-80">
                  {!isFlipped && "Click to reveal answer! 🤔"}
                  {isFlipped && "Did you get it right? 🤓"}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Answer Buttons */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-center space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(false)}
              className="flex items-center px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
            >
              <XCircle className="w-5 h-5 mr-2" />
              Need More Practice
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(true)}
              className="flex items-center px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Got It Right! 🎉
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevCard}
          disabled={currentCard === 0}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Previous
        </button>

        <button
          onClick={resetCards}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </button>

        <button
          onClick={nextCard}
          disabled={currentCard === flashcards.length - 1}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors disabled:opacity-50"
        >
          Next
          <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      </div>

      {/* Completion Message */}
      {currentCard === flashcards.length - 1 && isFlipped && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white rounded-2xl p-8 shadow-md"
        >
          <div className="text-4xl mb-4">🎊</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Amazing Work!
          </h3>
          <p className="text-gray-600 mb-4">
            You've completed all flashcards! Your score: {score.correct} correct out of {flashcards.length}
          </p>
          <p className="text-sm text-purple-600">
            Keep practicing to become an algebra master! 🌟
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default FlashcardViewer;