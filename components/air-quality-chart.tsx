'use client';

import { AirQualityMeasurement } from '@/types/air-quality';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AirQualityChartProps {
  measurements: AirQualityMeasurement[];
}

export function AirQualityChart({ measurements }: AirQualityChartProps) {
  const chartData = measurements.map((m) => ({
    date: format(new Date(m.timestamp), 'dd/MM', { locale: ptBR }),
    IQA: m.aqi,
    'PM2.5': m.pm25,
    'PM10': m.pm10,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Qualidade do Ar (Últimos 7 dias)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="IQA"
              stroke="#8884d8"
              strokeWidth={2}
              name="IQA"
            />
            <Line
              type="monotone"
              dataKey="PM2.5"
              stroke="#82ca9d"
              strokeWidth={2}
              name="PM2.5 (µg/m³)"
            />
            <Line
              type="monotone"
              dataKey="PM10"
              stroke="#ffc658"
              strokeWidth={2}
              name="PM10 (µg/m³)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

