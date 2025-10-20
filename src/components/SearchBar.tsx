import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { AICategory } from '@/types/email';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedAccount: string;
  onAccountChange: (account: string) => void;
  selectedFolder: string;
  onFolderChange: (folder: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const SearchBar = ({
  searchQuery,
  onSearchChange,
  selectedAccount,
  onAccountChange,
  selectedFolder,
  onFolderChange,
  selectedCategory,
  onCategoryChange,
}: SearchBarProps) => {
  const categories: (AICategory | 'All')[] = [
    'All',
    'Interested',
    'Meeting Booked',
    'Not Interested',
    'Spam',
    'Out of Office',
    'Uncategorized',
  ];

  return (
    <div className="p-4 border-b space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search emails..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <Select value={selectedAccount} onValueChange={onAccountChange}>
          <SelectTrigger>
            <SelectValue placeholder="Account" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Accounts</SelectItem>
            <SelectItem value="sales@acme.com">sales@acme.com</SelectItem>
            <SelectItem value="support@acme.com">support@acme.com</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedFolder} onValueChange={onFolderChange}>
          <SelectTrigger>
            <SelectValue placeholder="Folder" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Folders</SelectItem>
            <SelectItem value="INBOX">Inbox</SelectItem>
            <SelectItem value="Sent">Sent</SelectItem>
            <SelectItem value="Drafts">Drafts</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat.toLowerCase().replace(' ', '-')}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
