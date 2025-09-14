import { NextRequest, NextResponse } from 'next/server';
import { generateSpeech } from '@/lib/elevenlabs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, voiceId, format } = body;

    // Validation
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required and must be a string' },
        { status: 400 }
      );
    }

    if (!voiceId || typeof voiceId !== 'string') {
      return NextResponse.json(
        { error: 'Voice ID is required and must be a string' },
        { status: 400 }
      );
    }

    if (text.length > 2000) {
      return NextResponse.json(
        { error: 'Text exceeds maximum length of 2000 characters' },
        { status: 400 }
      );
    }

    if (!['mp3', 'wav'].includes(format)) {
      return NextResponse.json(
        { error: 'Format must be either mp3 or wav' },
        { status: 400 }
      );
    }

    // Generate speech using ElevenLabs API
    const audioBuffer = await generateSpeech(text, voiceId);

    // Set appropriate headers for audio response
    const headers = new Headers();
    headers.set('Content-Type', format === 'mp3' ? 'audio/mpeg' : 'audio/wav');
    headers.set('Content-Length', audioBuffer.byteLength.toString());
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    headers.set('Access-Control-Allow-Origin', '*');

    return new Response(audioBuffer, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Text-to-speech API error:', error);
    
    // Return appropriate error response
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    const statusCode = errorMessage.includes('Voice not found') ? 404 : 500;
    
    return NextResponse.json(
      { 
        error: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: statusCode }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      error: 'Method not allowed. Use POST to generate speech.',
      supportedMethods: ['POST'],
      requiredFields: ['text', 'voiceId', 'format']
    },
    { status: 405 }
  );
}