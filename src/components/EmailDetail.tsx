import { EmailDocument, SuggestedReply } from '@/types/email';
import { CategoryBadge } from './CategoryBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import { Sparkles, Zap, MessageSquare, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface EmailDetailProps {
  email: EmailDocument;
}

export const EmailDetail = ({ email }: EmailDetailProps) => {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock RAG-powered suggestion
  const mockSuggestion: SuggestedReply = {
    text: `Hi ${email.from.split('@')[0]},\n\nThank you for your interest in our platform! I'd be happy to schedule a demo call to walk you through our features.\n\nBased on your requirements, I think you'll be particularly interested in:\n• Real-time email synchronization with IMAP IDLE\n• AI-powered email categorization\n• Smart reply suggestions using RAG\n\nI have availability next Tuesday or Wednesday afternoon. Would either of those work for you?\n\nYou can book directly here: https://calendly.com/acme-sales/demo\n\nBest regards,\nSales Team`,
    retrievedContext: [
      'Product Feature: Real-time IMAP synchronization',
      'Meeting Link: https://calendly.com/acme-sales/demo',
      'Pricing: Enterprise plan starts at $299/month',
    ],
    confidence: 0.92,
  };

  const handleGenerateReply = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setShowSuggestion(true);
      toast.success('AI reply generated using RAG pipeline');
    }, 1500);
  };

  const handleCopyReply = () => {
    navigator.clipboard.writeText(mockSuggestion.text);
    toast.success('Reply copied to clipboard');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 p-6 border-b">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{email.subject}</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>From: {email.from}</span>
              <span>•</span>
              <span>{formatDistanceToNow(email.date, { addSuffix: true })}</span>
            </div>
          </div>
          <CategoryBadge category={email.aiCategory} />
        </div>

        {(email.webhookTriggered || email.slackNotified) && (
          <div className="flex items-center gap-2 text-sm">
            {email.webhookTriggered && (
              <div className="flex items-center gap-1 text-interested">
                <Zap className="h-4 w-4" />
                <span>Webhook triggered</span>
              </div>
            )}
            {email.slackNotified && (
              <div className="flex items-center gap-1 text-meeting-booked">
                <MessageSquare className="h-4 w-4" />
                <span>Slack notified</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap">{email.body}</div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI-Powered Reply Suggestion
            </h2>
            <Button
              onClick={handleGenerateReply}
              disabled={isGenerating}
              variant="default"
            >
              {isGenerating ? 'Generating...' : 'Generate Reply'}
            </Button>
          </div>

          {showSuggestion && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  <span>Suggested Reply (RAG-Enhanced)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Confidence: {(mockSuggestion.confidence * 100).toFixed(0)}%
                    </span>
                    <Button size="sm" variant="outline" onClick={handleCopyReply}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="whitespace-pre-wrap text-sm">{mockSuggestion.text}</div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">Retrieved Context (RAG):</h3>
                  <ul className="space-y-1">
                    {mockSuggestion.retrievedContext.map((context, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{context}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
