import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronRight, RotateCcw } from 'lucide-react';
import axios from 'axios';
import Loader from '../components/Loader';




const Flashcards = () => {
  const { subjectId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isloading , setIsLoading] = useState(false);
  const [response , setResponse] = useState("");



  useEffect(()=>{

    const fetchData = async () =>{

      try {
        console.log("hit");
        
        setIsLoading(true)
        const {data} = await axios.get(`http://localhost:8000/api/summarize/quiz/${subjectId}`)
        setResponse(data);
        setIsLoading(false);
      } catch (error) {
        console.log( "the error is "+error);
      }

    }
      fetchData();
  },[subjectId]);
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === response.quiz[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    if (currentQuestion < response.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

 
  if (!response?.quiz || isloading) {
    return <Loader />;
  }

  if (showResult) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Complete! 🎉</h2>
            <p className="text-xl mb-6">
              Your Score: {score} out of {response.quiz.length}
            </p>
           <Link to="/" className='rounded-full bg-violet-300 p-4' >
           DashBoard
           </Link>
           
          </div>
        </div>
      </div>
    );
  }

  const currentQ = response?.quiz[currentQuestion];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to={`/subject/${subjectId}`} className="mr-4 p-2 rounded-full hover:bg-white/50 transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Flashcard Practice 🧠
            </h1>
            <p className="text-gray-600 mt-2">
              Question {currentQuestion + 1} of {response.quiz.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-4 text-left rounded-lg border transition-all ${
                  selectedAnswer === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className={`mt-6 w-full flex items-center justify-center px-6 py-3 rounded-xl transition-colors ${
              selectedAnswer
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestion === response.quiz.length - 1 ? 'Finish' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;