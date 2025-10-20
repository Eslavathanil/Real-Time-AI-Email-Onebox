import { AICategory } from '@/types/email';
import { Badge } from '@/components/ui/badge';

interface CategoryBadgeProps {
  category: AICategory;
  className?: string;
}

export const CategoryBadge = ({ category, className }: CategoryBadgeProps) => {
  const getVariant = (): 'interested' | 'meeting-booked' | 'not-interested' | 'spam' | 'out-of-office' | 'uncategorized' => {
    switch (category) {
      case 'Interested':
        return 'interested';
      case 'Meeting Booked':
        return 'meeting-booked';
      case 'Not Interested':
        return 'not-interested';
      case 'Spam':
        return 'spam';
      case 'Out of Office':
        return 'out-of-office';
      default:
        return 'uncategorized';
    }
  };

  return (
    <Badge variant={getVariant()} className={className}>
      {category}
    </Badge>
  );
};
