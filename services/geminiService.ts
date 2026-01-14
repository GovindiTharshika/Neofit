
import { GoogleGenAI, Type } from "@google/genai";

export const generateWorkoutPlan = async (goal: string, level: string) => {
  // Use process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Create a professional gym workout plan for someone with the goal: "${goal}" and experience level: "${level}". 
    Focus on strength, hypertrophy, or conditioning as appropriate.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          goal: { type: Type.STRING },
          exercises: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                sets: { type: Type.STRING },
                reps: { type: Type.STRING },
                note: { type: Type.STRING }
              },
              required: ["name", "sets", "reps", "note"]
            }
          }
        },
        required: ["goal", "exercises"]
      }
    }
  });

  try {
    // response.text is a property, not a method.
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    return null;
  }
};
