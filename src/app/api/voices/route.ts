import { NextResponse } from 'next/server';
import { AVAILABLE_VOICES, getVoicesByCategory } from '@/lib/elevenlabs';

export async function GET() {
  try {
    const voicesByCategory = getVoicesByCategory();
    
    return NextResponse.json({
      success: true,
      voices: AVAILABLE_VOICES,
      voicesByCategory,
      totalVoices: AVAILABLE_VOICES.length,
      categories: Object.keys(voicesByCategory),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Voices API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch available voices',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { 
      error: 'Method not allowed. Use GET to fetch available voices.',
      supportedMethods: ['GET']
    },
    { status: 405 }
  );
}