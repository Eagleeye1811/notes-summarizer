import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Upload from './pages/Upload';
import Subjects from './pages/Subjects';
import SubjectDetail from './pages/SubjectDetail';
import Flashcards from './pages/Flashcards';
import AudioPlayer from './components/AudioPlayer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Subjects />} />
          <Route path="/subject/:subjectId" element={<SubjectDetail />} /> 
          <Route path="/flashcards/:subjectId" element={<Flashcards />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;