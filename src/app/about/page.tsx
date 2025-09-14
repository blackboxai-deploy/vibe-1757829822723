import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          About AI Voice Studio
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Pioneering the future of text-to-speech technology with advanced AI-powered voice synthesis
        </p>
      </div>

      {/* Mission Statement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-muted-foreground leading-relaxed">
            At AI Voice Studio, we believe that everyone should have access to professional-quality voice generation. 
            Our mission is to democratize speech synthesis technology, making it accessible, affordable, and easy to use 
            for creators, businesses, and individuals worldwide.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We combine cutting-edge artificial intelligence with intuitive design to deliver natural-sounding voices 
            that can bring any text to life. Whether you're creating content, developing applications, or need 
            accessibility solutions, AI Voice Studio provides the tools you need.
          </p>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Technology & Innovation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Advanced AI Models</h3>
              <p className="text-muted-foreground">
                Powered by state-of-the-art neural networks and deep learning algorithms, 
                our platform delivers human-like speech with natural intonation and emotion.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Neural TTS</Badge>
                <Badge variant="secondary">Deep Learning</Badge>
                <Badge variant="secondary">Voice Cloning</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Modern Web Platform</h3>
              <p className="text-muted-foreground">
                Built with the latest web technologies for fast, responsive, and secure 
                voice generation directly in your browser.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Next.js 15</Badge>
                <Badge variant="secondary">React 19</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">🎭 Multiple Voice Options</h4>
                <p className="text-sm text-muted-foreground">
                  Professional male and female voices with various accents and speaking styles
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">⚡ Real-time Processing</h4>
                <p className="text-sm text-muted-foreground">
                  Lightning-fast speech generation with instant audio playback
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">💾 Multiple Formats</h4>
                <p className="text-sm text-muted-foreground">
                  Download in MP3 or WAV formats for maximum compatibility
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">📱 Mobile Optimized</h4>
                <p className="text-sm text-muted-foreground">
                  Fully responsive design that works perfectly on all devices
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team & Values */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Our Values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-primary">Accessibility First</h4>
                <p className="text-sm text-muted-foreground">
                  Making voice technology accessible to everyone, regardless of technical expertise
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary">Quality Focus</h4>
                <p className="text-sm text-muted-foreground">
                  Delivering professional-grade audio that meets the highest standards
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary">Privacy Respect</h4>
                <p className="text-sm text-muted-foreground">
                  Protecting user data with secure processing and no permanent storage
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary">Continuous Innovation</h4>
                <p className="text-sm text-muted-foreground">
                  Constantly improving our AI models and user experience
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Use Cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold">Content Creation</h4>
                <p className="text-sm text-muted-foreground">
                  Podcasts, audiobooks, video narration, and educational content
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Business Applications</h4>
                <p className="text-sm text-muted-foreground">
                  Marketing materials, training videos, customer service, and presentations
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Accessibility Solutions</h4>
                <p className="text-sm text-muted-foreground">
                  Screen readers, voice assistants, and assistive technology integration
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Development Projects</h4>
                <p className="text-sm text-muted-foreground">
                  Mobile apps, web applications, games, and interactive experiences
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-primary/5 rounded-lg p-8 space-y-4">
        <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
        <p className="text-muted-foreground">
          Experience the power of AI voice generation today. No signup required, no hidden costs.
        </p>
        <div className="pt-4">
          <a 
            href="/" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Try AI Voice Studio Now
          </a>
        </div>
      </div>
    </div>
  );
}