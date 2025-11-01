'use server';
/**
 * @fileOverview Personalized module recommendations flow.
 *
 * This flow takes a user's learning history and preferences to provide personalized module recommendations.
 * - personalizedModuleRecommendations - A function that returns a list of personalized module recommendations.
 * - PersonalizedModuleRecommendationsInput - The input type for the personalizedModuleRecommendations function.
 * - PersonalizedModuleRecommendationsOutput - The return type for the personalizedModuleRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedModuleRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  learningHistory: z
    .array(z.string())
    .describe('The user learning history (array of module IDs).'),
  interests: z.array(z.string()).describe('The user interests (array of topics).'),
  completedLessons: z
    .array(z.string())
    .describe('The user completed lessons (array of lesson IDs).'),
});
export type PersonalizedModuleRecommendationsInput = z.infer<
  typeof PersonalizedModuleRecommendationsInputSchema
>;

const PersonalizedModuleRecommendationsOutputSchema = z.object({
  moduleIds: z
    .array(z.string())
    .describe('An array of module IDs recommended for the user.'),
});
export type PersonalizedModuleRecommendationsOutput = z.infer<
  typeof PersonalizedModuleRecommendationsOutputSchema
>;

export async function personalizedModuleRecommendations(
  input: PersonalizedModuleRecommendationsInput
): Promise<PersonalizedModuleRecommendationsOutput> {
  return personalizedModuleRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedModuleRecommendationsPrompt',
  input: {schema: PersonalizedModuleRecommendationsInputSchema},
  output: {schema: PersonalizedModuleRecommendationsOutputSchema},
  prompt: `You are an AI assistant that provides personalized module recommendations to users based on their learning history, interests, and completed lessons.

  Given the following user information, provide a list of 5 module IDs that would be most relevant to the user:

  User ID: {{{userId}}}
  Learning History: {{#if learningHistory}}{{#each learningHistory}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None{{/if}}
  Interests: {{#if interests}}{{#each interests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None{{/if}}
  Completed Lessons: {{#if completedLessons}}{{#each completedLessons}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None{{/if}}

  Return only the module IDs in the format ["moduleId1", "moduleId2", "moduleId3", "moduleId4", "moduleId5"].
`,
});

const personalizedModuleRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedModuleRecommendationsFlow',
    inputSchema: PersonalizedModuleRecommendationsInputSchema,
    outputSchema: PersonalizedModuleRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
