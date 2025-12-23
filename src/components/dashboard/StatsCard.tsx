import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'urgent';
}

const variantStyles = {
  default: 'bg-card border-border',
  primary: 'bg-primary/10 border-primary/20',
  success: 'bg-success/10 border-success/20',
  warning: 'bg-warning/10 border-warning/20',
  urgent: 'bg-urgent/10 border-urgent/20',
};

const iconStyles = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/20 text-primary',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning',
  urgent: 'bg-urgent/20 text-urgent',
};

export function StatsCard({ title, value, icon: Icon, trend, variant = 'default' }: StatsCardProps) {
  return (
    <Card className={`${variantStyles[variant]} border shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight text-foreground">{value.toLocaleString()}</p>
            {trend && (
              <p className={`text-sm font-medium ${trend.isPositive ? 'text-success' : 'text-urgent'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from yesterday
              </p>
            )}
          </div>
          <div className={`p-3 rounded-xl ${iconStyles[variant]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
