// API utility functions for backend communication
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  // Helper method for making requests
  async makeRequest(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Upload PDF file
  async uploadPDF(file) {
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }

  // Get subjects from uploaded PDF
  async getSubjects(uploadId) {
    return this.makeRequest(`/subjects/${uploadId}`);
  }

  // Get chapters for a subject
  async getChapters(subjectId) {
    return this.makeRequest(`/chapters/${subjectId}`);
  }

  // Get chapter summary
  async getChapterSummary(chapterId) {
    return this.makeRequest(`/summary/${chapterId}`);
  }

  // Get audio for chapter
  async getChapterAudio(chapterId) {
    return this.makeRequest(`/audio/${chapterId}`);
  }

  // Get flashcards for chapter
  async getFlashcards(chapterId) {
    return this.makeRequest(`/flashcards/${chapterId}`);
  }

  // Generate quiz for chapter
  async generateQuiz(chapterId) {
    return this.makeRequest(`/quiz/${chapterId}`, { method: 'POST' });
  }
}

export default new ApiService();