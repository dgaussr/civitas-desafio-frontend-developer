'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Neighborhood } from '@/types/air-quality';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AirQualityBadge } from '@/components/air-quality-badge';
import { AirQualityChart } from '@/components/air-quality-chart';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, MapPin, Clock, Wind, Droplets } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getAQIDescription } from '@/lib/air-quality-utils';

export default function NeighborhoodPage() {
  const params = useParams();
  const router = useRouter();
  const [neighborhood, setNeighborhood] = useState<Neighborhood | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNeighborhood = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/neighborhoods/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setNeighborhood(data);
        } else {
          console.error('Neighborhood not found');
        }
      } catch (error) {
        console.error('Error fetching neighborhood:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchNeighborhood();
  }, [params.id]);
  

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-6">
            <Skeleton className="h-8 w-64" />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-96 w-full" />
        </main>
      </div>
    );
  }

  if (!neighborhood) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Bairro não encontrado</h1>
          <Button onClick={() => router.push('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para o início
          </Button>
        </div>
      </div>
    );
  }

  const latestMeasurement = neighborhood.measurements[neighborhood.measurements.length - 1];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" onClick={() => router.push('/')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{neighborhood.name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {neighborhood.zone}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Atualizado em {format(new Date(neighborhood.lastUpdate), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </div>
              </div>
            </div>
            <AirQualityBadge level={neighborhood.currentQuality} className="text-lg px-4 py-2" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Índice de Qualidade do Ar (IQA)</CardTitle>
              <CardDescription>Medição atual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-6xl font-bold text-center mb-4">
                {neighborhood.currentAQI}
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {getAQIDescription(neighborhood.currentQuality)}
              </p>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Poluentes Medidos</CardTitle>
              <CardDescription>Concentrações atuais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Droplets className="w-4 h-4 mr-1" />
                    PM2.5
                  </div>
                  <div className="text-2xl font-bold">{latestMeasurement.pm25}</div>
                  <div className="text-xs text-muted-foreground">µg/m³</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Droplets className="w-4 h-4 mr-1" />
                    PM10
                  </div>
                  <div className="text-2xl font-bold">{latestMeasurement.pm10}</div>
                  <div className="text-xs text-muted-foreground">µg/m³</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Wind className="w-4 h-4 mr-1" />
                    O₃
                  </div>
                  <div className="text-2xl font-bold">{latestMeasurement.o3.toFixed(3)}</div>
                  <div className="text-xs text-muted-foreground">ppm</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Wind className="w-4 h-4 mr-1" />
                    NO₂
                  </div>
                  <div className="text-2xl font-bold">{latestMeasurement.no2.toFixed(3)}</div>
                  <div className="text-xs text-muted-foreground">ppm</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Wind className="w-4 h-4 mr-1" />
                    SO₂
                  </div>
                  <div className="text-2xl font-bold">{latestMeasurement.so2.toFixed(3)}</div>
                  <div className="text-xs text-muted-foreground">ppm</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Wind className="w-4 h-4 mr-1" />
                    CO
                  </div>
                  <div className="text-2xl font-bold">{latestMeasurement.co.toFixed(1)}</div>
                  <div className="text-xs text-muted-foreground">ppm</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <AirQualityChart measurements={neighborhood.measurements} />

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recomendações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {neighborhood.currentQuality === 'good' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">✓ Qualidade do ar excelente</h3>
                  <p className="text-green-800">
                    É um ótimo dia para atividades ao ar livre! A qualidade do ar está ideal para todas as pessoas.
                  </p>
                </div>
              )}
              {neighborhood.currentQuality === 'moderate' && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-semibold text-yellow-900 mb-2">⚠ Qualidade do ar aceitável</h3>
                  <p className="text-yellow-800">
                    A qualidade do ar é aceitável para a maioria das pessoas. Pessoas sensíveis devem considerar reduzir atividades prolongadas ao ar livre.
                  </p>
                </div>
              )}
              {(neighborhood.currentQuality === 'unhealthy' || neighborhood.currentQuality === 'hazardous') && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-2">⚠ Alerta de qualidade do ar</h3>
                  <p className="text-red-800">
                    {neighborhood.currentQuality === 'hazardous'
                      ? 'Emergência de saúde! Evite qualquer atividade ao ar livre. Permaneça em ambientes fechados com ar filtrado.'
                      : 'Evite atividades prolongadas ao ar livre. Grupos sensíveis devem permanecer em ambientes fechados. Considere usar máscaras se precisar sair.'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>© 2025 Prefeitura do Rio de Janeiro - Painel de Qualidade do Ar</p>
        </div>
      </footer>
    </div>
  );
}

