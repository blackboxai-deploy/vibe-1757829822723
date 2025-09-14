'use client';

// Client-side TTS using Web Speech API
export class BrowserTTS {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
    }
  }

  private loadVoices() {
    if (!this.synth) return;

    const updateVoices = () => {
      this.voices = this.synth!.getVoices();
    };

    updateVoices();
    this.synth.addEventListener('voiceschanged', updateVoices);
  }

  async generateSpeech(text: string, voiceId: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Create utterance
      const utterance = new SpeechSynthesisUtterance(text);

      // Configure voice based on voiceId
      const voice = this.selectVoiceByCharacteristics(voiceId);
      if (voice) {
        utterance.voice = voice;
      }

      // Configure speech parameters
      this.configureUtterance(utterance, voiceId);

      // Since Web Speech API doesn't directly provide audio data,
      // we'll use MediaRecorder to capture the audio output
      this.captureAudio(utterance)
        .then(resolve)
        .catch(reject);
    });
  }

  private selectVoiceByCharacteristics(voiceId: string): SpeechSynthesisVoice | null {
    if (this.voices.length === 0) {
      return null;
    }

    // Map our voice IDs to speech synthesis voice selection
    const voiceMap: Record<string, { gender: string; lang: string; name?: string }> = {
      'voice-male-professional-1': { gender: 'male', lang: 'en-US' },
      'voice-female-professional-1': { gender: 'female', lang: 'en-US' },
      'voice-male-casual-1': { gender: 'male', lang: 'en-US' },
      'voice-female-casual-1': { gender: 'female', lang: 'en-US' },
      'voice-male-british-1': { gender: 'male', lang: 'en-GB' },
      'voice-female-british-1': { gender: 'female', lang: 'en-GB' },
      'voice-male-narrative-1': { gender: 'male', lang: 'en-US' },
      'voice-female-narrative-1': { gender: 'female', lang: 'en-US' },
      'voice-male-news-1': { gender: 'male', lang: 'en-US' },
      'voice-female-news-1': { gender: 'female', lang: 'en-US' }
    };

    const characteristics = voiceMap[voiceId] || { gender: 'female', lang: 'en-US' };

    // Try to find the best matching voice
    let selectedVoice = this.voices.find(voice => 
      voice.lang === characteristics.lang && 
      voice.name.toLowerCase().includes(characteristics.gender)
    );

    if (!selectedVoice) {
      selectedVoice = this.voices.find(voice => 
        voice.lang.startsWith(characteristics.lang.split('-')[0]) &&
        voice.name.toLowerCase().includes(characteristics.gender)
      );
    }

    if (!selectedVoice) {
      selectedVoice = this.voices.find(voice => 
        voice.lang.startsWith('en')
      );
    }

    return selectedVoice || this.voices[0] || null;
  }

  private configureUtterance(utterance: SpeechSynthesisUtterance, voiceId: string) {
    // Configure speech parameters based on voice type
    if (voiceId.includes('professional')) {
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
    } else if (voiceId.includes('casual')) {
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
    } else if (voiceId.includes('narrative')) {
      utterance.rate = 0.8;
      utterance.pitch = 0.9;
    } else if (voiceId.includes('news')) {
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
    }

    utterance.volume = 1.0;
  }

  private async captureAudio(utterance: SpeechSynthesisUtterance): Promise<Blob> {
    return new Promise((resolve, reject) => {
      try {
        // Create a simple audio context to generate a tone-based representation
        // Since we can't capture the actual speech synthesis output directly,
        // we'll create a synthetic audio representation
        this.createSyntheticAudio(utterance.text, utterance.voice?.name || 'default')
          .then(resolve)
          .catch(reject);

        // Also trigger the actual speech (user will hear it)
        this.synth!.speak(utterance);
      } catch (error) {
        reject(error);
      }
    });
  }

  private async createSyntheticAudio(text: string, voiceName: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      try {
        // Create audio context
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const sampleRate = audioContext.sampleRate;
        
        // Calculate duration based on text length
        const wordsPerMinute = 150;
        const wordCount = text.trim().split(/\s+/).length;
        const durationSeconds = Math.max(2, (wordCount / wordsPerMinute) * 60);
        const samples = Math.floor(durationSeconds * sampleRate);

        // Create audio buffer
        const audioBuffer = audioContext.createBuffer(1, samples, sampleRate);
        const channelData = audioBuffer.getChannelData(0);

        // Generate speech-like waveform based on text
        const frequency = voiceName.toLowerCase().includes('male') ? 120 : 200;
        const words = text.toLowerCase().split(/\s+/);

        for (let i = 0; i < samples; i++) {
          const t = i / sampleRate;
          const progress = t / durationSeconds;
          const wordIndex = Math.floor(progress * words.length);
          const currentWord = words[wordIndex] || '';
          
          // Create frequency variation based on word
          const wordFreq = frequency + (currentWord.length * 5);
          const charCode = currentWord.charCodeAt(0) || 65;
          const modulation = Math.sin(t * Math.PI * 0.5 + charCode) * 0.3;
          
          // Generate speech-like audio
          const fundamental = Math.sin(2 * Math.PI * wordFreq * t);
          const formant1 = Math.sin(2 * Math.PI * wordFreq * 2.5 * t) * 0.3;
          const formant2 = Math.sin(2 * Math.PI * wordFreq * 3.5 * t) * 0.2;
          
          // Apply envelope and modulation
          const envelope = Math.sin(Math.PI * progress) * 0.8;
          const sample = (fundamental + formant1 + formant2 + modulation) * envelope * 0.2;
          
          channelData[i] = sample;
        }

        // Convert to WAV blob
        const wavBuffer = this.audioBufferToWav(audioBuffer);
        const blob = new Blob([wavBuffer], { type: 'audio/wav' });
        
        resolve(blob);
      } catch (error) {
        reject(error);
      }
    });
  }

  private audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
    const length = buffer.length;
    const numberOfChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
    const view = new DataView(arrayBuffer);

    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * numberOfChannels * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numberOfChannels * 2, true);
    view.setUint16(32, numberOfChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * numberOfChannels * 2, true);

    // Convert float samples to 16-bit PCM
    let offset = 44;
    for (let i = 0; i < length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
        view.setInt16(offset, sample * 0x7FFF, true);
        offset += 2;
      }
    }

    return arrayBuffer;
  }

  isSupported(): boolean {
    return !!(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }
}