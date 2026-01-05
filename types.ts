
export enum Sentiment {
  POSITIVE = 'Positive',
  NEUTRAL = 'Neutral',
  NEGATIVE = 'Negative'
}

export interface BrandData {
  name: string;
  visibilityScore: number;
  sentiment: Sentiment;
  mentions: number;
}

export interface Prompt {
  id: string;
  text: string;
  status: 'active' | 'paused';
  createdAt: string;
}

export interface Alert {
  id: string;
  timestamp: string;
  prompt: string;
  competitor: string;
  engine: string;
  status: 'new' | 'seen';
  response?: string;
}

export interface VisibilityDataPoint {
  date: string;
  myBrand: number;
  competitorA: number;
  competitorB: number;
}

export interface SentimentDistribution {
  name: string;
  value: number;
  color: string;
}

export interface AIResponseAudit {
  id: string;
  engine: string;
  prompt: string;
  timestamp: string;
  response: string;
  sentiment: Sentiment;
}
