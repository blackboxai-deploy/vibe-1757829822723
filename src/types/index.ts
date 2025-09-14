export interface Voice {
  id: string;
  name: string;
  gender: 'male' | 'female';
  accent: string;
  description: string;
  category: 'professional' | 'casual' | 'narrative' | 'specialized';
}

export interface TTSRequest {
  text: string;
  voiceId: string;
  format: 'mp3' | 'wav';
}

export interface TTSResponse {
  success: boolean;
  audioUrl?: string;
  audioBuffer?: ArrayBuffer;
  error?: string;
  duration?: number;
}

export interface AudioHistory {
  id: string;
  text: string;
  voiceId: string;
  voiceName: string;
  audioUrl: string;
  format: 'mp3' | 'wav';
  timestamp: number;
  duration?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface PricingTier {
  name: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  charactersPerMonth: number;
  voiceOptions: number;
  priority: boolean;
  popular?: boolean;
}