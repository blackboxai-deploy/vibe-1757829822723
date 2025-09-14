import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { Navigation } from '@/components/Navigation';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Voice Studio - Professional Text-to-Speech',
  description: 'Convert text to realistic AI-generated speech with professional voices. High-quality text-to-speech with multiple voice options and instant audio generation.',
  keywords: 'text to speech, AI voice, voice generation, audio conversion, TTS, speech synthesis',
  authors: [{ name: 'AI Voice Studio' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'AI Voice Studio - Professional Text-to-Speech',
    description: 'Convert text to realistic AI-generated speech with professional voices',
    type: 'website',
    locale: 'en_US',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}