import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Loader, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UploadForm = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
      } else {
        alert('Please upload a PDF file! 📄');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
      } else {
        alert('Please upload a PDF file! 📄');
      }
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    
    setUploading(true);
    
    // Simulate upload and processing
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
      
      // Navigate to subjects page after a brief success animation
      setTimeout(() => {
        navigate('/subjects');
      }, 1500);
    }, 3000);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
          dragActive 
            ? 'border-purple-400 bg-purple-50' 
            : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Drop your PDF here or click to browse
              </h3>
              <p className="text-gray-500">
                We support PDF files up to 10MB. Ready to make studying fun? 🎯
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="file"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center justify-center space-x-4 p-4 bg-green-50 rounded-xl"
            >
              <FileText className="w-12 h-12 text-green-600" />
              <div className="text-left">
                <h4 className="font-semibold text-green-800">{file.name}</h4>
                <p className="text-green-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {file && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <button
            onClick={handleSubmit}
            disabled={uploading || uploaded}
            className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all ${
              uploading || uploaded
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 hover:scale-105'
            } text-white shadow-lg`}
          >
            {uploading ? (
              <div className="flex items-center">
                <Loader className="w-6 h-6 mr-2 animate-spin" />
                Creating magic... ✨
              </div>
            ) : uploaded ? (
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Ready to explore! 🎉
              </div>
            ) : (
              'Summarize Now! 🚀'
            )}
          </button>
          
          {uploading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-600 mt-4"
            >
              Hang tight! We're analyzing your content and creating awesome summaries... 🤖
            </motion.p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default UploadForm;