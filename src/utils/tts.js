// Text-to-Speech utility for converting summaries to audio
class TTSService {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.currentUtterance = null;
    this.isPlaying = false;
    this.callbacks = {
      onStart: null,
      onEnd: null,
      onPause: null,
      onResume: null,
    };
  }

  // Get available voices
  getVoices() {
    return this.synthesis.getVoices().filter(voice => 
      voice.lang.startsWith('en-') // English voices only
    );
  }

  // Convert text to speech
  speak(text, options = {}) {
    // Stop current speech if playing
    if (this.isPlaying) {
      this.stop();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice options
    utterance.rate = options.rate || 0.9; // Slightly slower for better comprehension
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 0.8;
    
    // Set voice (prefer female voice for educational content)
    const voices = this.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Female') || voice.name.includes('Samantha')
    ) || voices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Set up event listeners
    utterance.onstart = () => {
      this.isPlaying = true;
      if (this.callbacks.onStart) this.callbacks.onStart();
    };

    utterance.onend = () => {
      this.isPlaying = false;
      this.currentUtterance = null;
      if (this.callbacks.onEnd) this.callbacks.onEnd();
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      this.isPlaying = false;
      this.currentUtterance = null;
    };

    this.currentUtterance = utterance;
    this.synthesis.speak(utterance);
  }

  // Pause speech
  pause() {
    if (this.synthesis.speaking && !this.synthesis.paused) {
      this.synthesis.pause();
      this.isPlaying = false;
      if (this.callbacks.onPause) this.callbacks.onPause();
    }
  }

  // Resume speech
  resume() {
    if (this.synthesis.paused) {
      this.synthesis.resume();
      this.isPlaying = true;
      if (this.callbacks.onResume) this.callbacks.onResume();
    }
  }

  // Stop speech
  stop() {
    if (this.synthesis.speaking) {
      this.synthesis.cancel();
      this.isPlaying = false;
      this.currentUtterance = null;
      if (this.callbacks.onEnd) this.callbacks.onEnd();
    }
  }

  // Set callbacks
  setCallbacks(callbacks) {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  // Get current state
  getState() {
    return {
      isPlaying: this.isPlaying,
      isPaused: this.synthesis.paused,
      isSupported: 'speechSynthesis' in window,
    };
  }

  // Process text for better speech (remove markdown, add pauses)
  processTextForSpeech(text) {
    return text
      // Remove markdown formatting
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers
      .replace(/_(.*?)_/g, '$1') // Remove italic markers
      .replace(/`(.*?)`/g, '$1') // Remove code markers
      .replace(/#{1,6}\s/g, '') // Remove heading markers
      
      // Add natural pauses
      .replace(/\./g, '. ') // Pause after sentences
      .replace(/:/g, ': ') // Pause after colons
      .replace(/;/g, '; ') // Pause after semicolons
      .replace(/,/g, ', ') // Brief pause after commas
      
      // Clean up extra spaces
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Create chapter audio with enhanced formatting
  speakChapterSummary(summary) {
    const processedText = this.processTextForSpeech(summary);
    
    // Add introduction
    const intro = "Here's your personalized chapter summary. ";
    const outro = " Great job learning! Keep up the excellent work.";
    
    const fullText = intro + processedText + outro;
    
    this.speak(fullText, {
      rate: 0.85, // Slower for educational content
      pitch: 1.1, // Slightly higher pitch for engagement
    });
  }
}

export default new TTSService();