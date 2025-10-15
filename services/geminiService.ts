/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {GoogleGenAI, Modality} from '@google/genai';

export const generateSpeech = async (text: string): Promise<string> => {
  const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

  // Add instructions for tone and language
  const prompt = `Fale em um tom calmo e informativo, em português do Brasil: ${text}`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-preview-tts',
    contents: [{parts: [{text: prompt}]}],
    config: {
      responseModalities: [Modality.AUDIO],
      // No specific voiceConfig is set to allow the model to select a suitable
      // voice based on the prompt's language and instructions.
      speechConfig: {},
    },
  });

  const base64Audio =
    response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) {
    throw new Error('No audio data received from API.');
  }
  return base64Audio;
};
