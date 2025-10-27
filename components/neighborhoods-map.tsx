'use client';

import { Neighborhood } from '@/types/air-quality';
import { Card } from '@/components/ui/card';
import { getAQIColor, getAQILabel } from '@/lib/air-quality-utils';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

interface NeighborhoodsMapProps {
  neighborhoods: Neighborhood[];
  loading?: boolean;
}

export function NeighborhoodsMap({ neighborhoods, loading }: NeighborhoodsMapProps) {
  if (loading) {
    return <Skeleton className="h-[600px] w-full" />;
  }

  // Group neighborhoods by zone
  const zones = neighborhoods.reduce((acc, neighborhood) => {
    if (!acc[neighborhood.zone]) {
      acc[neighborhood.zone] = [];
    }
    acc[neighborhood.zone].push(neighborhood);
    return acc;
  }, {} as Record<string, Neighborhood[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Mapa de Qualidade do Ar por Zona</h3>
        <div className="flex gap-2 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Bom</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Moderado</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span>Ruim</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Péssimo</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(zones).map(([zone, zoneNeighborhoods]) => (
          <Card key={zone} className="p-6">
            <h4 className="font-semibold text-lg mb-4">{zone}</h4>
            <div className="grid grid-cols-2 gap-3">
              {zoneNeighborhoods.map((neighborhood) => (
                <Link
                  key={neighborhood.id}
                  href={`/neighborhood/${neighborhood.id}`}
                  className="group"
                >
                  <div
                    className={cn(
                      'p-4 rounded-lg border-2 transition-all hover:scale-105 hover:shadow-md',
                      getAQIColor(neighborhood.currentQuality),
                      'bg-opacity-20 hover:bg-opacity-30'
                    )}
                  >
                    <div className="text-sm font-medium text-foreground group-hover:underline">
                      {neighborhood.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      IQA: {neighborhood.currentAQI}
                    </div>
                    <div className="text-xs font-semibold mt-1">
                      {getAQILabel(neighborhood.currentQuality)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

