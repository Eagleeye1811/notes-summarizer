import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import UploadForm from '../components/UploadForm';

const Upload = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/" className="mr-4 p-2 rounded-full hover:bg-white/50 transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">
            Upload Your Study Material 📤
          </h1>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Let's get started! 🌟
            </h2>
            <p className="text-gray-600">
              Upload your PDF and we'll create amazing summaries for you to study with!
            </p>
          </div>
          
          <UploadForm />
        </div>
      </div>
    </div>
  );
};

export default Upload;