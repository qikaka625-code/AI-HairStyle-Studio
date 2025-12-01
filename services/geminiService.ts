import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Edits an image based on a text prompt using Gemini 2.5 Flash Image.
 * 
 * @param base64Image The source image in base64 format
 * @param prompt The instruction for editing
 * @param restrictToHair If true, appends instructions to strictly preserve face and background
 * @returns The generated image as a base64 string
 */
export const editHairstyle = async (
  base64Image: string, 
  prompt: string, 
  restrictToHair: boolean = true
): Promise<string> => {
  try {
    // Ensure clean base64 string
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
    
    // Use Gemini 2.5 Flash Image
    const modelId = 'gemini-2.5-flash-image';

    let fullPrompt = prompt;
    if (restrictToHair) {
      fullPrompt = `${prompt}. Maintain the original face facial features, identity, expression, lighting, and background exactly as they are. Only change the hair. High quality, photorealistic.`;
    } else {
      // For general edits, we still want high quality
      fullPrompt = `${prompt}. High quality, photorealistic.`;
    }

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: fullPrompt
          }
        ]
      }
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
           return `data:image/jpeg;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image generated in response.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};