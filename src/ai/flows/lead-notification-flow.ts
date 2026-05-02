'use server';
/**
 * @fileOverview A flow that handles notifications for new customer leads using Resend.
 *
 * - notifyAdmin - A function that processes lead data and sends an email via Resend.
 * - LeadNotificationInput - Input schema for lead details.
 * - LeadNotificationOutput - Output schema for the result of the notification.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Resend } from 'resend';

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

const resend = new Resend(process.env.RESEND_API_KEY);

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
    // 1. Generate a professional summary using AI
    const prompt = `
      Generate a professional internal notification summary for a new business lead.
      Customer Name: ${input.name}
      Contact Email: ${input.email}
      Contact Phone: ${input.phone}
      Vehicle: ${input.vehicleType}
      Service Requested: ${input.service}
      Customer Message: ${input.message}
      
      Format it as a concise executive summary for the sales team at Apex Wraper.
    `;

    const { text } = await ai.generate(prompt);

    // 2. Send the email via Resend
    try {
      const { data, error } = await resend.emails.send({
        from: 'Apex Wraper Leads <onboarding@resend.dev>',
        to: 'hello@apexwraps.com', // Recipient email address
        subject: `New Lead: ${input.name} - ${input.service}`,
        text: text,
      });

      if (error) {
        console.error('Resend API Error:', error);
        return {
          success: false,
          status: `Resend Error: ${error.message}`,
        };
      }

      console.log('--- NEW LEAD RECEIVED (Email Sent) ---');
      console.log('ID:', data?.id);
      console.log('-------------------------------');

      return {
        success: true,
        status: 'Lead notification successfully sent.',
      };
    } catch (err: any) {
      console.error('Failed to send lead notification:', err);
      return {
        success: false,
        status: `Network or Server Error: ${err.message}`,
      };
    }
  }
);
