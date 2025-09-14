'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { AudioHistory } from '@/types';

interface AudioPlayerProps {
  audioUrl: string;
  audioData: AudioHistory;
  onDownload: (audioUrl: string, format: 'mp3' | 'wav', filename?: string) => void;
}

export function AudioPlayer({ audioUrl, audioData, onDownload }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [downloadFormat, setDownloadFormat] = useState<'mp3' | 'wav'>('mp3');
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = value[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    const filename = `voice-${audioData.voiceName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.${downloadFormat}`;
    onDownload(audioUrl, downloadFormat, filename);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
        
        {/* Audio Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2">Generated Audio</h3>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {audioData.text}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  {audioData.voiceName}
                </Badge>
                <Badge variant="outline">
                  {audioData.format.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="space-y-4">
            {/* Play/Pause and Timeline */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={togglePlay}
                className="flex-shrink-0 w-12 h-12 rounded-full p-0 hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1zM14 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 4.293a1 1 0 011.414 0L16 13.586V11a1 1 0 112 0v5a1 1 0 01-1 1h-5a1 1 0 110-2h2.586L5.293 5.707a1 1 0 010-1.414z M9.293 4.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H5a1 1 0 110-2h9.586L9.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </Button>

              <div className="flex-1 space-y-2">
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={handleSeek}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            {/* Volume and Download Controls */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.293a1 1 0 00-1.414 0L5.293 7.086A1 1 0 005 7.793V12.207a1 1 0 00.293.707l3.793 3.793a1 1 0 001.414 0l3.793-3.793A1 1 0 0014.5 12.207V7.793a1 1 0 00-.293-.707L10.5 3.293z M10 5.414L12.586 8H11a1 1 0 000 2h1.586L10 12.586 7.414 10H9a1 1 0 100-2H7.414L10 5.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <Slider
                  value={[volume]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setVolume(value[0])}
                  className="w-20"
                />
                <span className="text-xs text-muted-foreground w-8">
                  {volume}%
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Select value={downloadFormat} onValueChange={(value: 'mp3' | 'wav') => setDownloadFormat(value)}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mp3">MP3</SelectItem>
                    <SelectItem value="wav">WAV</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="hover:scale-105 transition-transform"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}