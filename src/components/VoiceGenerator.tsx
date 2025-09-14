'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { AudioPlayer } from '@/components/AudioPlayer';
import { VoiceHistory } from '@/components/VoiceHistory';
import { AVAILABLE_VOICES, getVoicesByCategory, getVoiceById } from '@/lib/elevenlabs';
import { BrowserTTS } from '@/lib/browser-tts';
import type { AudioHistory } from '@/types';

const MAX_CHARACTERS = 2000;

export function VoiceGenerator() {
  const [text, setText] = useState('');
  const [selectedVoiceId, setSelectedVoiceId] = useState(AVAILABLE_VOICES[0].id);
  const [selectedFormat, setSelectedFormat] = useState<'mp3' | 'wav'>('mp3');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);
  const [currentAudioData, setCurrentAudioData] = useState<AudioHistory | null>(null);
  const [audioHistory, setAudioHistory] = useState<AudioHistory[]>([]);
   const [generationProgress, setGenerationProgress] = useState(0);
  const [browserTTS] = useState(() => new BrowserTTS());

  const voicesByCategory = getVoicesByCategory();

  const characterCount = text.length;
  const characterPercentage = (characterCount / MAX_CHARACTERS) * 100;

  const handleTextChange = (value: string) => {
    if (value.length <= MAX_CHARACTERS) {
      setText(value);
    }
  };

   const generateSpeech = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to convert to speech');
      return;
    }

    if (characterCount > MAX_CHARACTERS) {
      toast.error(`Text exceeds maximum length of ${MAX_CHARACTERS} characters`);
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    // Progress simulation
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 15;
      });
    }, 300);

    try {
      let audioBlob: Blob;
      let audioUrl: string;

      // Try browser TTS first if available
      if (browserTTS.isSupported()) {
        console.log('Using browser-based TTS');
        toast.info('Generating speech using browser TTS...');
        
        audioBlob = await browserTTS.generateSpeech(text, selectedVoiceId);
        audioUrl = URL.createObjectURL(audioBlob);
        
        setGenerationProgress(100);
        toast.success('Speech generated successfully using browser TTS!');
      } else {
        // Fallback to server-side TTS
        console.log('Using server-side TTS');
        toast.info('Generating speech using server TTS...');
        
        const response = await fetch('/api/text-to-speech', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text,
            voiceId: selectedVoiceId,
            format: selectedFormat,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate speech');
        }

        audioBlob = await response.blob();
        audioUrl = URL.createObjectURL(audioBlob);
        setGenerationProgress(100);
        toast.success('Speech generated successfully using server TTS!');
      }

      setGeneratedAudioUrl(audioUrl);

      // Create audio history entry
      const selectedVoice = getVoiceById(selectedVoiceId);
      const historyEntry: AudioHistory = {
        id: Date.now().toString(),
        text: text.trim(),
        voiceId: selectedVoiceId,
        voiceName: selectedVoice?.name || 'Unknown Voice',
        audioUrl,
        format: selectedFormat,
        timestamp: Date.now(),
      };

      setCurrentAudioData(historyEntry);
      setAudioHistory(prev => [historyEntry, ...prev]);

    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate speech. Please try again.');
    } finally {
      clearInterval(progressInterval);
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  const downloadAudio = async (audioUrl: string, format: 'mp3' | 'wav', filename?: string) => {
    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || `voice-${Date.now()}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success(`Audio downloaded as ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download audio');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Main Generator Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Text-to-Speech Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Text Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="text-input" className="text-sm font-medium">
                Enter your text
              </label>
              <div className="flex items-center space-x-2">
                <span 
                  className={`text-xs font-medium ${
                    characterPercentage > 90 
                      ? 'text-destructive' 
                      : characterPercentage > 75 
                      ? 'text-yellow-500' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {characterCount}/{MAX_CHARACTERS}
                </span>
                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      characterPercentage > 90 
                        ? 'bg-destructive' 
                        : characterPercentage > 75 
                        ? 'bg-yellow-500' 
                        : 'bg-primary'
                    }`}
                    style={{ width: `${Math.min(characterPercentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
            <Textarea
              id="text-input"
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Type or paste your text here... (up to 2000 characters)"
              className="min-h-32 resize-none text-base"
              disabled={isGenerating}
            />
          </div>

          {/* Voice Selection */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="voice-select" className="text-sm font-medium">
                Select Voice
              </label>
              <Select value={selectedVoiceId} onValueChange={setSelectedVoiceId}>
                <SelectTrigger id="voice-select">
                  <SelectValue placeholder="Choose a voice" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {Object.entries(voicesByCategory).map(([category, voices]) => (
                    <div key={category}>
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {category}
                      </div>
                       {voices.map((voice: any) => (
                        <SelectItem key={voice.id} value={voice.id}>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{voice.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {voice.accent}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
              {selectedVoiceId && (
                <p className="text-xs text-muted-foreground">
                  {getVoiceById(selectedVoiceId)?.description}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="format-select" className="text-sm font-medium">
                Audio Format
              </label>
              <Select value={selectedFormat} onValueChange={(value: 'mp3' | 'wav') => setSelectedFormat(value)}>
                <SelectTrigger id="format-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mp3">MP3 (Recommended)</SelectItem>
                  <SelectItem value="wav">WAV (Uncompressed)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Generate Button */}
          <div className="space-y-4">
            <Button
              onClick={generateSpeech}
              disabled={isGenerating || !text.trim() || characterCount > MAX_CHARACTERS}
              size="lg"
              className="w-full md:w-auto px-8 py-3 text-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              {isGenerating ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>Generating Speech...</span>
                </div>
              ) : (
                'Generate Voice'
              )}
            </Button>

            {/* Progress Bar */}
            {isGenerating && (
              <div className="space-y-2">
                <Progress value={generationProgress} className="w-full" />
                <p className="text-sm text-muted-foreground text-center">
                  Processing your text... {generationProgress}%
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Audio Player */}
      {generatedAudioUrl && currentAudioData && (
        <AudioPlayer
          audioUrl={generatedAudioUrl}
          audioData={currentAudioData}
          onDownload={downloadAudio}
        />
      )}

      {/* History */}
      {audioHistory.length > 0 && (
        <VoiceHistory
          history={audioHistory}
          onReplay={(audioData) => {
            setGeneratedAudioUrl(audioData.audioUrl);
            setCurrentAudioData(audioData);
          }}
          onDownload={downloadAudio}
        />
      )}
    </div>
  );
}