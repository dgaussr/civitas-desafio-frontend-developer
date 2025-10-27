import Link from 'next/link';
import { Neighborhood } from '@/types/air-quality';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AirQualityBadge } from './air-quality-badge';
import { MapPin, Clock, TrendingUp, Wind } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getAQIColor, getAQIBorderColor } from '@/lib/air-quality-utils';

interface NeighborhoodCardProps {
  neighborhood: Neighborhood;
}

export function NeighborhoodCard({ neighborhood }: NeighborhoodCardProps) {
  const borderColor = getAQIBorderColor(neighborhood.currentQuality);
  const bgColor = getAQIColor(neighborhood.currentQuality);

  return (
    <Link href={`/neighborhood/${neighborhood.id}`}>
      <Card className={`hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-l-4 ${borderColor} hover:scale-105`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-xl mb-1">{neighborhood.name}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {neighborhood.zone}
              </div>
            </div>
            <AirQualityBadge level={neighborhood.currentQuality} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* IQA Display */}
            <div className={`${bgColor} text-white rounded-lg p-4 text-center`}>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Wind className="w-5 h-5" />
                <span className="text-sm font-medium">IQA Atual</span>
              </div>
              <div className="text-4xl font-bold">{neighborhood.currentAQI}</div>
            </div>

            {/* Latest Measurements */}
            {neighborhood.measurements && neighborhood.measurements.length > 0 && (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-muted rounded p-2">
                  <div className="text-muted-foreground mb-1">PM2.5</div>
                  <div className="font-semibold">{neighborhood.measurements[neighborhood.measurements.length - 1].pm25.toFixed(1)} µg/m³</div>
                </div>
                <div className="bg-muted rounded p-2">
                  <div className="text-muted-foreground mb-1">PM10</div>
                  <div className="font-semibold">{neighborhood.measurements[neighborhood.measurements.length - 1].pm10.toFixed(1)} µg/m³</div>
                </div>
              </div>
            )}

            {/* Last Update */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Atualizado {format(new Date(neighborhood.lastUpdate), "HH:mm", { locale: ptBR })}
              </div>
              <TrendingUp className="w-3 h-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

