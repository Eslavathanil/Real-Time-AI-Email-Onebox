export type AICategory = 'Interested' | 'Meeting Booked' | 'Not Interested' | 'Spam' | 'Out of Office' | 'Uncategorized';

export interface EmailDocument {
  id: string;
  accountId: string;
  folder: string;
  subject: string;
  body: string;
  from: string;
  to: string[];
  date: Date;
  aiCategory: AICategory;
  indexedAt: Date;
  hasAttachments?: boolean;
  isRead?: boolean;
  webhookTriggered?: boolean;
  slackNotified?: boolean;
}

export interface Account {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
}

export interface SuggestedReply {
  text: string;
  retrievedContext: string[];
  confidence: number;
}
