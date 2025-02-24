import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface StatsCardProps {
  title: string;
  value: number | string | null;
  icon: React.ReactNode;
  className?: string;
  href?: string;
}

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  className,
  href 
}: StatsCardProps) => {
  const cardContent = (
    <Card className={cn(
      "hover:shadow-lg transition-all relative group",
      href && "hover:border-2 hover:-m-[1px]", // Adjust for border offset
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </div>
        {icon}
      </CardHeader>
      <CardContent>
        {value === null ? (
          <Loader2 className="animate-spin h-8 w-8 mx-auto text-gray-500" />
        ) : (
          <p className="text-3xl font-bold">{value}</p>
        )}
      </CardContent>
      
      {/* Hover indicator */}
      {href && (
        <div className="absolute inset-0 flex items-center justify-end pr-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
    </Card>
  );

  return href ? (
    <Link href={href} className="block h-full" aria-label={`View ${title}`}>
      {cardContent}
    </Link>
  ) : cardContent;
};

export default StatsCard;
