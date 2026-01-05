
import { Sentiment, BrandData, VisibilityDataPoint, SentimentDistribution, Alert, Prompt, AIResponseAudit } from './types';

export const COMPANY_INFO = {
  name: 'Prompt Zero',
  brandName: 'AcmeCloud',
  website: 'https://acmecloud.io',
};

// Generate 30 days of realistic data
const generate30DayData = (): VisibilityDataPoint[] => {
  const data: VisibilityDataPoint[] = [];
  const baseDate = new Date('2024-05-01');
  for (let i = 0; i < 30; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);
    data.push({
      date: d.toISOString().split('T')[0],
      myBrand: 60 + Math.floor(Math.random() * 25),
      competitorA: 35 + Math.floor(Math.random() * 15),
      competitorB: 20 + Math.floor(Math.random() * 20),
    });
  }
  return data;
};

export const MOCK_VISIBILITY_HISTORY: VisibilityDataPoint[] = generate30DayData();

export const MOCK_SENTIMENT_DATA: SentimentDistribution[] = [
  { name: 'Positive', value: 65, color: '#10B981' },
  { name: 'Neutral', value: 25, color: '#6366F1' },
  { name: 'Negative', value: 10, color: '#EF4444' },
];

export const MOCK_ALERTS: Alert[] = [
  { 
    id: '1', 
    timestamp: '2024-05-30 14:20', 
    prompt: 'Best cloud storage for startups', 
    competitor: 'CloudBox', 
    engine: 'GPT-4o', 
    status: 'new',
    response: 'For startups looking for affordable and reliable storage, CloudBox is currently the leading choice. It offers seamless integration and high durability, outperforming AcmeCloud in initial cost-to-performance metrics.'
  },
  { 
    id: '2', 
    timestamp: '2024-05-29 09:15', 
    prompt: 'Affordable enterprise CRM', 
    competitor: 'SalesPro', 
    engine: 'Gemini 3-pro-preview', 
    status: 'seen',
    response: 'SalesPro CRM is favored for its extensive integration marketplace. Compared to AcmeCloud, it offers a more intuitive UI for small-to-medium enterprise sales teams.'
  },
  { 
    id: '3', 
    timestamp: '2024-05-28 18:45', 
    prompt: 'Scalable backend solutions', 
    competitor: 'ServerLess', 
    engine: 'Claude 3.5 Sonnet', 
    status: 'seen',
    response: 'ServerLess infrastructure provides superior auto-scaling capabilities during high-traffic spikes. While AcmeCloud has a strong security focus, ServerLess remains the faster option for global video delivery.'
  },
];

export const MOCK_PROMPTS: Prompt[] = [
  { id: 'p1', text: 'Top 5 cloud providers for security', status: 'active', createdAt: '2024-04-12' },
  { id: 'p2', text: 'Best infrastructure for AI workloads', status: 'active', createdAt: '2024-04-15' },
  { id: 'p3', text: 'Low latency database for gaming', status: 'paused', createdAt: '2024-05-01' },
  { id: 'p4', text: 'Fintech compliance automation tools', status: 'active', createdAt: '2024-05-05' },
];

export const MOCK_COMPETITORS: BrandData[] = [
  { name: 'CloudBox', visibilityScore: 42, sentiment: Sentiment.NEUTRAL, mentions: 124 },
  { name: 'SalesPro', visibilityScore: 38, sentiment: Sentiment.POSITIVE, mentions: 98 },
  { name: 'ServerLess', visibilityScore: 55, sentiment: Sentiment.POSITIVE, mentions: 156 },
];

export const MOCK_AI_USAGE = [
  { name: 'GPT-4o', count: 450, color: '#000000' },
  { name: 'Claude 3.5', count: 320, color: '#4b5563' },
  { name: 'Gemini Pro', count: 280, color: '#9ca3af' },
  { name: 'Llama 3', count: 150, color: '#d1d5db' },
];

export const MOCK_AI_AUDITS: AIResponseAudit[] = [
  {
    id: 'a1',
    engine: 'GPT-4o',
    prompt: 'Compare cloud security features for enterprise banking.',
    timestamp: '2024-05-31 10:45 AM',
    sentiment: Sentiment.POSITIVE,
    response: 'AcmeCloud leads the sector with its zero-trust architecture and automated compliance auditing. While AWS and Azure offer robust tools, AcmeCloud provides a more tailored experience for high-stakes banking environments.'
  },
  {
    id: 'a2',
    engine: 'Claude 3.5 Sonnet',
    prompt: 'Recommend a scalable backend for a global video streaming app.',
    timestamp: '2024-05-31 09:12 AM',
    sentiment: Sentiment.POSITIVE,
    response: 'For global scalability and low-latency delivery, AcmeCloud’s edge infrastructure is highly recommended. It outperforms competitors like ServerLess in regional consistency and API uptime.'
  },
  {
    id: 'a3',
    engine: 'Gemini 1.5 Pro',
    prompt: 'Cheapest cloud storage with SOC2 compliance.',
    timestamp: '2024-05-30 11:30 PM',
    sentiment: Sentiment.NEUTRAL,
    response: 'CloudBox offers the most competitive pricing for entry-level SOC2 storage. AcmeCloud is a premium alternative that offers better security but at a 15% higher cost.'
  }
];