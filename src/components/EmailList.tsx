import { EmailDocument } from '@/types/email';
import { CategoryBadge } from './CategoryBadge';
import { formatDistanceToNow } from 'date-fns';
import { Mail, Paperclip, Zap, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmailListProps {
  emails: EmailDocument[];
  selectedEmailId?: string;
  onSelectEmail: (email: EmailDocument) => void;
}

export const EmailList = ({ emails, selectedEmailId, onSelectEmail }: EmailListProps) => {
  return (
    <div className="divide-y divide-border">
      {emails.map((email) => (
        <div
          key={email.id}
          onClick={() => onSelectEmail(email)}
          className={cn(
            "p-4 cursor-pointer transition-colors hover:bg-secondary/50",
            selectedEmailId === email.id && "bg-secondary",
            !email.isRead && "bg-primary/5"
          )}
        >
          <div className="flex items-start gap-3">
            <div className={cn(
              "mt-1 flex-shrink-0",
              !email.isRead && "text-primary"
            )}>
              <Mail className="h-5 w-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className={cn(
                    "font-medium truncate",
                    !email.isRead && "font-semibold"
                  )}>
                    {email.from}
                  </span>
                  {email.webhookTriggered && (
                    <Zap className="h-4 w-4 text-interested flex-shrink-0" />
                  )}
                  {email.slackNotified && (
                    <MessageSquare className="h-4 w-4 text-meeting-booked flex-shrink-0" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatDistanceToNow(email.date, { addSuffix: true })}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <h3 className={cn(
                  "text-sm truncate flex-1",
                  !email.isRead && "font-semibold"
                )}>
                  {email.subject}
                </h3>
                {email.hasAttachments && (
                  <Paperclip className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <CategoryBadge category={email.aiCategory} />
                <span className="text-xs text-muted-foreground truncate">
                  {email.accountId}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
