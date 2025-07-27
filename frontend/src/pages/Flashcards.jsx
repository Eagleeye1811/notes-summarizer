import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FlashcardViewer from '../components/FlashcardViewer';
import Test  from '../components/Test';
const Flashcards = () => {
  const { subjectId } = useParams();

  useEffect(()=>{},[])

  const data = response.quiz;

  
  

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
              Test your knowledge and reinforce learning! You've got this! 💪
            </p>
          </div>
        </div>

        <div className='w-full h-100 rounded-full shadow-amber-100'> { data.map((value , index ) => ( <Test  key={index} question={value.question}  /> ) )} </div>
      </div>
    </div>
  );
};

export default Flashcards;


const response = {
  "summary": "Here's a summary of the provided technical content on Artificial Intelligence and Machine Learning, broken down into 4-6 key points:\n\n*   **Definition and Approaches to AI:** Artificial Intelligence (AI) aims to build smart machines capable of tasks requiring human intelligence, learning from data to perform human-like actions and enhance efficiency. AI can be categorized by its approaches: mimicking human thinking or acting rationally, and by its capabilities (Narrow, General, Super AI) and functionalities (Reactive Machines, Limited Memory, Theory of Mind, Self-Awareness).\n\n*   **Problem Solving and Search:** AI agents perceive and act upon their environment. Problem-solving agents use search algorithms to find optimal sequences of actions to reach a goal. Key components of problem formulation include the initial state, actions, transition model, goal test, and path cost.\n\n*   **Uninformed Search Algorithms:** These algorithms explore problem spaces without prior knowledge of the goal's location. Common types include Depth-First Search (DFS), Breadth-First Search (BFS), Depth-Limited Search, Iterative Deepening DFS, Uniform-Cost Search, and Bidirectional Search, each with trade-offs in memory, time, and optimality.\n\n*   **Informed (Heuristic) Search Strategies:** These algorithms leverage heuristic functions to estimate the distance to the goal, guiding the search more efficiently. Greedy Search and A* Search are prominent examples, combining path cost (g(x)) with heuristic estimates (h(x)) to find optimal solutions.\n\n*   **Local Search and Adversarial Search:** Local search algorithms explore neighboring states without tracking paths, useful for large state spaces but prone to local optima. Adversarial search deals with competitive environments, like games, where agents have conflicting goals, often employing game trees and algorithms like minimax.\n\n*   **Constraint Satisfaction Problems (CSP) and Applications:** CSPs involve finding solutions within defined limitations. Common CSP examples include map coloring and the n-Queens problem. AI has diverse applications across e-commerce, education, healthcare, robotics, autonomous vehicles, and more, enhancing various aspects of daily life and industry.",
  "audio_path": "audio/AI_notes_summary.mp3",
  "quiz": [
    {
      "question": "What are the four approaches to Artificial Intelligence mentioned in the text?",
      "options": [
        "Thinking humanly, thinking rationally, acting humanly, acting rationally",
        "Reactive machines, limited memory, theory of mind, self-awareness",
        "Narrow AI, General AI, Super AI, Hybrid AI",
        "Rule-based systems, neural networks, deep learning, machine learning"
      ],
      "answer": "Thinking humanly, thinking rationally, acting humanly, acting rationally"
    },
    {
      "question": "Which type of AI is capable of understanding thoughts and emotions and interacting socially?",
      "options": [
        "Reactive machines",
        "Limited memory",
        "Theory of mind",
        "Self-awareness"
      ],
      "answer": "Theory of mind"
    },
    {
      "question": "According to the text, what is the main difference between Machine Learning and Deep Learning?",
      "options": [
        "Machine learning uses algorithms, while deep learning uses neural networks.",
        "Deep learning is a subcategory of machine learning that mimics the human brain's neural network.",
        "Machine learning focuses on prediction, while deep learning focuses on understanding.",
        "There is no significant difference; the terms are used interchangeably."
      ],
      "answer": "Deep learning is a subcategory of machine learning that mimics the human brain's neural network."
    },
    {
      "question": "What is a rational agent, as defined in the text?",
      "options": [
        "An agent that always acts in a way that benefits humanity.",
        "An agent that acts to maximize the expected value of the performance measure, given the percept sequence it has seen so far.",
        "An agent that learns from its mistakes and improves over time.",
        "An agent that can perfectly predict the future."
      ],
      "answer": "An agent that acts to maximize the expected value of the performance measure, given the percept sequence it has seen so far."
    },
    {
      "question": "Which search algorithm guarantees finding the solution with the fewest steps if a solution exists, but may require significant memory?",
      "options": [
        "Depth-First Search (DFS)",
        "Breadth-First Search (BFS)",
        "Iterative Deepening Search (IDS)",
        "Uniform Cost Search (UCS)"
      ],
      "answer": "Breadth-First Search (BFS)"
    }
  ]
}