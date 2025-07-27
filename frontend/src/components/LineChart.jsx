import React from 'react';
import { TrendingUp } from 'lucide-react';

const LineChart = ({ quizData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
          Quiz Performance
        </h3>
        <span className="text-sm text-gray-500">Last 5 Tests</span>
      </div>
      <div className="h-64 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">Line Chart showing quizzes given with score in each test</p>
          <div className="mt-4 space-y-2">
            {quizData.map((quiz, index) => (
              <div key={index} className="flex justify-between text-xs">
                <span>{quiz.test}</span>
                <span className="font-medium">{quiz.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineChart; 