import { AirQualityLevel } from '@/types/air-quality';
import { getAQIColor, getAQILabel } from '@/lib/air-quality-utils';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AirQualityBadgeProps {
  level: AirQualityLevel;
  className?: string;
}

export function AirQualityBadge({ level, className }: AirQualityBadgeProps) {
  const colorClass = getAQIColor(level);
  const label = getAQILabel(level);

  return (
    <Badge
      className={cn(
        colorClass,
        'text-white font-semibold',
        className
      )}
    >
      {label}
    </Badge>
  );
}

