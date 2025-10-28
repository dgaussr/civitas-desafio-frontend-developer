'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import Image from 'next/image';
import { Neighborhood, AirQualityLevel } from '@/types/air-quality';
import { NeighborhoodsList } from '@/components/neighborhoods-list';
import { Filters } from '@/components/filters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { List, Map } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const InteractiveMap = lazy(() => import('@/components/interactive-map').then(mod => ({ default: mod.InteractiveMap })));

export default function Home() {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [loading, setLoading] = useState(true);
  const [zone, setZone] = useState('all');
  const [qualityLevel, setQualityLevel] = useState<AirQualityLevel | 'all'>('all');

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (zone !== 'all') params.append('zone', zone);
        if (qualityLevel !== 'all') params.append('qualityLevel', qualityLevel);
  
        const response = await fetch(`/api/neighborhoods?${params.toString()}`);
        const data = await response.json();
        setNeighborhoods(data);
      } catch (error) {
        console.error('Error fetching neighborhoods:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchNeighborhoods();
  }, [zone, qualityLevel]);
  

  const stats = {
    total: neighborhoods.length,
    good: neighborhoods.filter(n => n.currentQuality === 'good').length,
    moderate: neighborhoods.filter(n => n.currentQuality === 'moderate').length,
    unhealthy: neighborhoods.filter(n => n.currentQuality === 'unhealthy').length,
    hazardous: neighborhoods.filter(n => n.currentQuality === 'hazardous').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/prefeitura-rio-logo.png"
              alt="Prefeitura do Rio de Janeiro"
              width={60}
              height={120}
              className="object-contain"
              priority
            />
            <div>
              <h1 className="text-3xl font-bold">Painel de Qualidade do Ar</h1>
              <p className="text-muted-foreground">Cidade do Rio de Janeiro</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total de Bairros</CardDescription>
              <CardTitle className="text-3xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Bom</CardDescription>
              <CardTitle className="text-3xl text-green-600">{stats.good}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Moderado</CardDescription>
              <CardTitle className="text-3xl text-yellow-600">{stats.moderate}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Ruim</CardDescription>
              <CardTitle className="text-3xl text-orange-600">{stats.unhealthy}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Péssimo</CardDescription>
              <CardTitle className="text-3xl text-purple-900">{stats.hazardous}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>
              Filtre os bairros por zona e nível de qualidade do ar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Filters
              zone={zone}
              qualityLevel={qualityLevel}
              onZoneChange={setZone}
              onQualityLevelChange={setQualityLevel}
            />
          </CardContent>
        </Card>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="list">
              <List className="w-4 h-4 mr-2" />
              Lista
            </TabsTrigger>
            <TabsTrigger value="map">
              <Map className="w-4 h-4 mr-2" />
              Mapa
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-6">
            <NeighborhoodsList neighborhoods={neighborhoods} loading={loading} />
          </TabsContent>

          <TabsContent value="map" className="mt-6">
            {loading ? (
              <Skeleton className="w-full h-[600px] rounded-lg" />
            ) : (
              <Suspense fallback={<Skeleton className="w-full h-[600px] rounded-lg" />}>
                <InteractiveMap neighborhoods={neighborhoods} />
              </Suspense>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>© 2025 Prefeitura do Rio de Janeiro - Painel de Qualidade do Ar</p>
        </div>
      </footer>
    </div>
  );
}
