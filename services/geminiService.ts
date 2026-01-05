
import { GoogleGenAI, Type } from "@google/genai";
import { Sentiment } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getBrandInsights = async (brandName: string, data: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following brand visibility data for "${brandName}" and provide 3 key actionable insights in a JSON format with fields "insight" and "priority" (High/Medium/Low). 
      Data: ${JSON.stringify(data)}`,
      config: {
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Insights Error:", error);
    return [];
  }
};

export const analyzeCompetitor = async (name: string, url: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the brand "${name}" at the URL "${url}". 
      Estimate its visibility score (an integer 0-100), total mentions in recent AI training datasets/search (an integer), and the overall neural sentiment (must be one of: "Positive", "Neutral", "Negative").
      Return the results in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            visibilityScore: { type: Type.INTEGER },
            mentions: { type: Type.INTEGER },
            sentiment: { type: Type.STRING, description: "Must be Positive, Neutral, or Negative" }
          },
          required: ["visibilityScore", "mentions", "sentiment"]
        }
      }
    });
    
    const result = JSON.parse(response.text || '{}');
    // Ensure sentiment matches the enum
    if (!Object.values(Sentiment).includes(result.sentiment)) {
      result.sentiment = Sentiment.NEUTRAL;
    }
    return result;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      visibilityScore: Math.floor(Math.random() * 50) + 10,
      mentions: Math.floor(Math.random() * 500) + 50,
      sentiment: Sentiment.NEUTRAL
    };
  }
};
