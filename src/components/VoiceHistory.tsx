'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { AudioHistory } from '@/types';

interface VoiceHistoryProps {
  history: AudioHistory[];
  onReplay: (audioData: AudioHistory) => void;
  onDownload: (audioUrl: string, format: 'mp3' | 'wav', filename?: string) => void;
}

export function VoiceHistory({ history, onReplay, onDownload }: VoiceHistoryProps) {
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    
    return date.toLocaleDateString();
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const handleDownload = (audioData: AudioHistory) => {
    const filename = `voice-${audioData.voiceName.replace(/\s+/g, '-').toLowerCase()}-${audioData.timestamp}.${audioData.format}`;
    onDownload(audioData.audioUrl, audioData.format, filename);
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Session History</CardTitle>
        <p className="text-sm text-muted-foreground">
          Your generated voices from this session
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 pr-4">
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex items-start space-x-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                {/* Voice Info */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.voiceName}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.format.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {truncateText(item.text)}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReplay(item)}
                    className="text-xs px-2 py-1 h-8 hover:bg-primary/10"
                  >
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.293 4.293a1 1 0 011.414 0L16 13.586V11a1 1 0 112 0v5a1 1 0 01-1 1h-5a1 1 0 110-2h2.586L5.293 5.707a1 1 0 010-1.414z M9.293 4.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H5a1 1 0 110-2h9.586L9.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Play
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(item)}
                    className="text-xs px-2 py-1 h-8 hover:bg-primary/10"
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Save
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {history.length > 0 && (
          <div className="mt-4 pt-3 border-t text-center">
            <p className="text-xs text-muted-foreground">
              {history.length} voice{history.length !== 1 ? 's' : ''} generated this session
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}