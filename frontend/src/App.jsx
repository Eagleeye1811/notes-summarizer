import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Upload from './pages/Upload';
import Subjects from './pages/Subjects';
import Chapters from './pages/Chapters';
import ChapterDetail from './pages/ChapterDetail';
import Flashcards from './pages/Flashcards';
import AudioPlayer from './components/AudioPlayer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/chapters/:subjectId" element={<Chapters />} />
          <Route path="/chapter/:chapterId" element={<ChapterDetail />} />
          <Route path="/flashcards/:chapterId" element={<Flashcards />} />
        </Routes>
        <AudioPlayer />
      </div>
    </Router>
  );
}

export default App;