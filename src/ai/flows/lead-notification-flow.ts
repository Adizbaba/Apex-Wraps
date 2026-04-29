'use server';
/**
 * @fileOverview A flow that handles notifications for new customer leads.
 *
 * - notifyAdmin - A function that processes lead data and triggers notification logic.
 * - LeadNotificationInput - Input schema for lead details.
 * - LeadNotificationOutput - Output schema for the result of the notification.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const LeadNotificationInputSchema = z.object({
  name: z.string().describe('Full name of the customer'),
  email: z.string().email().describe('Email address of the customer'),
  phone: z.string().describe('Phone number of the customer'),
  vehicleType: z.string().describe('Type of vehicle the customer has'),
  service: z.string().describe('Service the customer is interested in'),
  message: z.string().describe('The customer\'s message or request'),
});

export type LeadNotificationInput = z.infer<typeof LeadNotificationInputSchema>;

const LeadNotificationOutputSchema = z.object({
  success: z.boolean(),
  status: z.string(),
});

export type LeadNotificationOutput = z.infer<typeof LeadNotificationOutputSchema>;

export async function notifyAdmin(input: LeadNotificationInput): Promise<LeadNotificationOutput> {
  return leadNotificationFlow(input);
}

const leadNotificationFlow = ai.defineFlow(
  {
    name: 'leadNotificationFlow',
    inputSchema: LeadNotificationInputSchema,
    outputSchema: LeadNotificationOutputSchema,
  },
  async (input) => {
    // This flow processes the lead and prepares it for notification.
    // In a production environment, you would integrate with an email service API here (e.g., Resend, SendGrid).
    
    // We use AI to generate a professional internal notification summary
    const prompt = `
      Generate a professional internal notification summary for a new business lead.
      Customer Name: ${input.name}
      Service: ${input.service}
      Vehicle: ${input.vehicleType}
      Message: ${input.message}
      
      Format it as a concise executive summary for the sales team.
    `;

    const { text } = await ai.generate(prompt);

    // LOGGING: This drafts the email content. To actually send it, integrate an email provider.
    console.log('--- NEW LEAD RECEIVED (Notification Drafted) ---');
    console.log(text);
    console.log('-------------------------------');

    return {
      success: true,
      status: 'Lead notification successfully drafted and logged.',
    };
  }
);
