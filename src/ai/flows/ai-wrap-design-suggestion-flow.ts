'use server';
/**
 * @fileOverview An AI agent that generates custom car wrap design ideas and color scheme suggestions.
 *
 * - aiWrapDesignSuggestion - A function that handles the AI design suggestion process.
 * - AiWrapDesignSuggestionInput - The input type for the aiWrapDesignSuggestion function.
 * - AiWrapDesignSuggestionOutput - The return type for the aiWrapDesignSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiWrapDesignSuggestionInputSchema = z.object({
  vehicleType: z.string().describe('The type of vehicle (e.g., "sports car", "SUV", "truck").'),
  aestheticPreferences: z.string().describe('User preferences for the design (e.g., "sleek and modern", "aggressive and bold", "subtle and elegant", "sci-fi", "geometric patterns").'),
});
export type AiWrapDesignSuggestionInput = z.infer<typeof AiWrapDesignSuggestionInputSchema>;

const AiWrapDesignSuggestionOutputSchema = z.object({
  designIdeas: z.array(z.string()).describe('A list of detailed design ideas for the car wrap.'),
  colorSchemeSuggestions: z.array(z.string()).describe('A list of color scheme suggestions with explanations.'),
});
export type AiWrapDesignSuggestionOutput = z.infer<typeof AiWrapDesignSuggestionOutputSchema>;

export async function aiWrapDesignSuggestion(
  input: AiWrapDesignSuggestionInput
): Promise<AiWrapDesignSuggestionOutput> {
  return aiWrapDesignSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiWrapDesignSuggestionPrompt',
  input: {schema: AiWrapDesignSuggestionInputSchema},
  output: {schema: AiWrapDesignSuggestionOutputSchema},
  prompt: `You are an expert car wrap designer AI. Your task is to generate creative and detailed car wrap design ideas and matching color scheme suggestions based on the user's vehicle type and aesthetic preferences.

Vehicle Type: {{{vehicleType}}}
Aesthetic Preferences: {{{aestheticPreferences}}}

Provide at least 3 distinct design ideas and 3 color scheme suggestions. For each design idea, describe the concept, patterns, and overall feel. For each color scheme, list the colors (e.g., "Matte Black and Gloss Orange Accents") and explain why they fit the aesthetic.

Generate the output in JSON format, ensuring all fields are present and valid according to the output schema description. DO NOT include any additional text outside the JSON object.
`,
});

const aiWrapDesignSuggestionFlow = ai.defineFlow(
  {
    name: 'aiWrapDesignSuggestionFlow',
    inputSchema: AiWrapDesignSuggestionInputSchema,
    outputSchema: AiWrapDesignSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
