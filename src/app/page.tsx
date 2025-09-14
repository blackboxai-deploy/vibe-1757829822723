import { VoiceGenerator } from '@/components/VoiceGenerator';

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          AI Voice Studio
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Transform your text into professional, natural-sounding speech with advanced AI voice technology
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>10+ Professional Voices</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span>Multiple Accents & Styles</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <span>Instant Audio Generation</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            <span>MP3 & WAV Downloads</span>
          </div>
        </div>
      </div>

      {/* Main Voice Generator */}
      <VoiceGenerator />

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 py-8">
        <div className="text-center space-y-3 p-6 rounded-lg border bg-card">
          <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">Professional Quality</h3>
          <p className="text-sm text-muted-foreground">
            High-definition audio with natural pronunciation and emotion
          </p>
        </div>

        <div className="text-center space-y-3 p-6 rounded-lg border bg-card">
          <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">Lightning Fast</h3>
          <p className="text-sm text-muted-foreground">
            Generate speech in seconds with our optimized AI processing
          </p>
        </div>

        <div className="text-center space-y-3 p-6 rounded-lg border bg-card">
          <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">Easy to Use</h3>
          <p className="text-sm text-muted-foreground">
            Simple interface with instant playback and download options
          </p>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-semibold">Enter Text</h3>
            <p className="text-sm text-muted-foreground">
              Type or paste your text (up to 2000 characters)
            </p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="w-8 h-8 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-semibold">Choose Voice</h3>
            <p className="text-sm text-muted-foreground">
              Select from our variety of professional voices
            </p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="w-8 h-8 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-semibold">Generate</h3>
            <p className="text-sm text-muted-foreground">
              Click generate and wait for AI processing
            </p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="w-8 h-8 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="font-semibold">Download</h3>
            <p className="text-sm text-muted-foreground">
              Play, download, and share your audio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}