import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Headphones, Brain, Star } from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import AudioPlayer from '../components/AudioPlayer';

const SubjectDetail = () => {
  const { subjectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [subject, setSubject] = useState(null);
  
  // Mock subjects data - in real app, this would come from backend
  const subjectsData = {
    1: {
      id: 1,
      title: 'Mathematics',
      emoji: '📐',
      summary: `Mathematics is a fundamental subject that develops logical thinking and problem-solving skills. 

**Key Concepts:**
- Numbers and Operations: Understanding basic arithmetic and number systems
- Algebra: Working with variables, equations, and mathematical expressions
- Geometry: Studying shapes, sizes, and spatial relationships
- Statistics: Analyzing and interpreting data

**Core Skills:**
1. Critical thinking and logical reasoning
2. Pattern recognition and problem-solving
3. Mathematical modeling and abstraction
4. Data analysis and interpretation

**Real-world Applications:**
Mathematics is essential in everyday life, from budgeting and shopping to understanding statistics in the news. It's the foundation for careers in science, engineering, finance, technology, and many other fields.

**Study Tips:**
- Practice regularly with different types of problems
- Understand concepts before memorizing formulas
- Connect mathematical ideas to real-world situations
- Don't be afraid to make mistakes - they're part of learning!

Remember, mathematics is a language that helps us understand the world around us. You've got this! 💪`,
      difficulty: 'Beginner',
      duration: '20 min read'
    },
    2: {
      id: 2,
      title: 'Physics',
      emoji: '⚡',
      summary: `Physics is the study of matter, energy, and the fundamental forces that govern the universe. 

**Key Concepts:**
- Mechanics: Motion, forces, and energy
- Thermodynamics: Heat, temperature, and energy transfer
- Electromagnetism: Electric and magnetic fields
- Quantum Physics: Behavior of matter at atomic scales

**Core Skills:**
1. Mathematical modeling and problem-solving
2. Experimental design and data analysis
3. Critical thinking and logical reasoning
4. Understanding natural phenomena

**Real-world Applications:**
Physics explains everything from how cars move to how stars shine. It's essential for engineering, technology, medicine, and understanding our world.

**Study Tips:**
- Visualize concepts with diagrams and models
- Practice solving problems step by step
- Connect theory to real-world examples
- Use mathematics as a tool for understanding

Physics helps us understand the universe from the smallest particles to the largest galaxies! 🌌`,
      difficulty: 'Intermediate',
      duration: '25 min read'
    },
    3: {
      id: 3,
      title: 'Chemistry',
      emoji: '🧪',
      summary: `Chemistry explores the composition, structure, and properties of matter and the changes it undergoes. 

**Key Concepts:**
- Atomic Structure: Understanding atoms and their components
- Chemical Bonding: How atoms combine to form molecules
- Reactions: Chemical changes and energy transformations
- Solutions: Mixtures and their properties

**Core Skills:**
1. Laboratory techniques and safety
2. Quantitative analysis and calculations
3. Understanding molecular interactions
4. Predicting chemical behavior

**Real-world Applications:**
Chemistry is everywhere - from cooking and cleaning to medicine and materials science. It helps us create new materials and understand biological processes.

**Study Tips:**
- Practice balancing chemical equations
- Understand the periodic table patterns
- Visualize molecular structures
- Connect lab experiments to theory

Chemistry is the science of change and transformation! 🔬`,
      difficulty: 'Intermediate',
      duration: '22 min read'
    },
    4: {
      id: 4,
      title: 'Biology',
      emoji: '🧬',
      summary: `Biology is the study of living organisms and their interactions with each other and their environment. 

**Key Concepts:**
- Cell Biology: Structure and function of cells
- Genetics: Inheritance and DNA
- Evolution: How species change over time
- Ecology: Interactions between organisms and environment

**Core Skills:**
1. Scientific observation and analysis
2. Understanding biological systems
3. Critical thinking about living processes
4. Laboratory and field techniques

**Real-world Applications:**
Biology helps us understand health, disease, agriculture, and environmental conservation. It's crucial for medicine, biotechnology, and environmental science.

**Study Tips:**
- Use diagrams to understand processes
- Connect concepts across different topics
- Practice identifying patterns in nature
- Understand the scientific method

Biology helps us understand the amazing diversity of life on Earth! 🌱`,
      difficulty: 'Beginner',
      duration: '18 min read'
    },
    5: {
      id: 5,
      title: 'History',
      emoji: '📚',
      summary: `History is the study of past events, societies, and human experiences that have shaped our world. 

**Key Concepts:**
- Ancient Civilizations: Early human societies and cultures
- World Wars: Global conflicts and their impacts
- Industrial Revolution: Technological and social changes
- Modern Era: Contemporary global developments

**Core Skills:**
1. Critical analysis of historical sources
2. Understanding cause and effect relationships
3. Contextual thinking and perspective-taking
4. Research and evidence evaluation

**Real-world Applications:**
History helps us understand current events, make informed decisions, and appreciate different cultures. It's essential for citizenship and global awareness.

**Study Tips:**
- Create timelines to visualize events
- Analyze multiple perspectives on events
- Connect historical events to modern issues
- Use primary and secondary sources

History teaches us about human nature and the patterns that shape our world! 🏛️`,
      difficulty: 'Beginner',
      duration: '15 min read'
    },
    6: {
      id: 6,
      title: 'Literature',
      emoji: '📖',
      summary: `Literature explores written works that express ideas, emotions, and human experiences through creative language. 

**Key Concepts:**
- Literary Analysis: Understanding themes, characters, and symbolism
- Different Genres: Poetry, prose, drama, and fiction
- Cultural Context: How literature reflects society
- Creative Expression: Using language artistically

**Core Skills:**
1. Critical reading and interpretation
2. Analytical thinking and writing
3. Understanding cultural perspectives
4. Creative expression and communication

**Real-world Applications:**
Literature develops empathy, communication skills, and cultural understanding. It's valuable for careers in writing, education, law, and media.

**Study Tips:**
- Read actively and take notes
- Analyze themes and character development
- Consider historical and cultural context
- Practice writing about literature

Literature opens windows to different worlds and perspectives! 📚`,
      difficulty: 'Intermediate',
      duration: '20 min read'
    }
  };

  useEffect(() => {
    // Simulate loading and fetch subject data
    const timer = setTimeout(() => {
      const subjectData = subjectsData[subjectId];
      if (subjectData) {
        setSubject(subjectData);
      } else {
        // Fallback for unknown subject
        setSubject({
          id: subjectId,
          title: 'Unknown Subject',
          emoji: '❓',
          summary: 'Subject information not available.',
          difficulty: 'Unknown',
          duration: 'Unknown'
        });
      }
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [subjectId]);

  const handleAudioClick = () => {
    setShowAudioPlayer(true);
  };

  const handleCloseAudio = () => {
    setShowAudioPlayer(false);
  };

  if (!subject) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/" className="mr-4 p-2 rounded-full hover:bg-white/50 transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {subject.emoji} {subject.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          <div className="lg:col-span-2">
            <SummaryCard summary={subject.summary} isLoading={isLoading} />
          </div>

          <div className="flex flex-col gap-4 w-full">
            <button
              onClick={handleAudioClick}
              className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
            >
              <Headphones className="w-5 h-5 mr-2" />
              Listen to Audio 🎧
            </button>
            <Link
              to={`/flashcards/${subjectId}`}
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Brain className="w-5 h-5 mr-2" />
              Practice Flashcards 🧠
            </Link>
          </div>
        </div>
      </div>

      {/* Render AudioPlayer when showAudioPlayer is true */}
      {showAudioPlayer && <AudioPlayer onClose={handleCloseAudio} />}
    </div>
  );
};

export default SubjectDetail;