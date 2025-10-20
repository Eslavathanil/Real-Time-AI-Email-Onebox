import { useState, useMemo } from 'react';
import { mockEmails } from '@/data/mockEmails';
import { EmailList } from '@/components/EmailList';
import { EmailDetail } from '@/components/EmailDetail';
import { SearchBar } from '@/components/SearchBar';
import { EmailDocument } from '@/types/email';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Activity, Inbox } from 'lucide-react';

const Index = () => {
  const [selectedEmail, setSelectedEmail] = useState<EmailDocument | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredEmails = useMemo(() => {
    return mockEmails.filter((email) => {
      // Search filter
      if (searchQuery && !email.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !email.body.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !email.from.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Account filter
      if (selectedAccount !== 'all' && email.accountId !== selectedAccount) {
        return false;
      }

      // Folder filter
      if (selectedFolder !== 'all' && email.folder !== selectedFolder) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && 
          email.aiCategory.toLowerCase().replace(' ', '-') !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedAccount, selectedFolder, selectedCategory]);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex-shrink-0 border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-primary">
              <Inbox className="h-6 w-6" />
              <h1 className="text-2xl font-bold">AI Email Onebox</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4 text-interested" />
              <span>Real-time IMAP IDLE • Elasticsearch • Gemini AI • RAG</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">
              {filteredEmails.length} emails
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Email List Panel */}
          <ResizablePanel defaultSize={35} minSize={25}>
            <div className="h-full flex flex-col">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedAccount={selectedAccount}
                onAccountChange={setSelectedAccount}
                selectedFolder={selectedFolder}
                onFolderChange={setSelectedFolder}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              <div className="flex-1 overflow-auto">
                <EmailList
                  emails={filteredEmails}
                  selectedEmailId={selectedEmail?.id}
                  onSelectEmail={setSelectedEmail}
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Email Detail Panel */}
          <ResizablePanel defaultSize={65}>
            {selectedEmail ? (
              <EmailDetail email={selectedEmail} />
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Inbox className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Select an email to view details</p>
                </div>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Index;
