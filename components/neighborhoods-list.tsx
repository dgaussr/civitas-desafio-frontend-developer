'use client';

import { Neighborhood } from '@/types/air-quality';
import { NeighborhoodCard } from './neighborhood-card';
import { Skeleton } from '@/components/ui/skeleton';

interface NeighborhoodsListProps {
  neighborhoods: Neighborhood[];
  loading?: boolean;
}

export function NeighborhoodsList({ neighborhoods, loading }: NeighborhoodsListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    );
  }

  if (neighborhoods.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nenhum bairro encontrado com os filtros selecionados.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {neighborhoods.map((neighborhood) => (
        <NeighborhoodCard key={neighborhood.id} neighborhood={neighborhood} />
      ))}
    </div>
  );
}

