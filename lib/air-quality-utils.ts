import { AirQualityLevel } from '@/types/air-quality';

export function getAQILevel(aqi: number): AirQualityLevel {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 150) return 'unhealthy';
  return 'hazardous';
}

export function getAQIColor(level: AirQualityLevel): string {
  const colors = {
    good: 'bg-green-500',
    moderate: 'bg-yellow-500',
    unhealthy: 'bg-orange-500',
    hazardous: 'bg-purple-900',
  };
  return colors[level];
}

export function getAQITextColor(level: AirQualityLevel): string {
  const colors = {
    good: 'text-green-700',
    moderate: 'text-yellow-700',
    unhealthy: 'text-orange-700',
    'very-unhealthy': 'text-red-700',
    hazardous: 'text-purple-900',
  };
  return colors[level];
}

export function getAQIBorderColor(level: AirQualityLevel): string {
  const colors = {
    good: 'border-green-500',
    moderate: 'border-yellow-500',
    unhealthy: 'border-orange-500',
    hazardous: 'border-purple-900',
  };
  return colors[level];
}

export function getAQILabel(level: AirQualityLevel): string {
  const labels = {
    good: 'Bom',
    moderate: 'Moderado',
    unhealthy: 'Ruim',
    hazardous: 'Péssimo',
  };
  return labels[level];
}

export function getAQIDescription(level: AirQualityLevel): string {
  const descriptions = {
    good: 'A qualidade do ar é satisfatória e a poluição do ar apresenta pouco ou nenhum risco.',
    moderate: 'A qualidade do ar é aceitável. No entanto, pode haver um risco moderado para algumas pessoas.',
    unhealthy: 'Membros de grupos sensíveis podem experimentar efeitos na saúde. O público em geral não é susceptível de ser afetado.',
    hazardous: 'Emergência de saúde: todos podem experimentar efeitos graves na saúde. Evite atividades ao ar livre.',
  };
  return descriptions[level];
}

export function calculateAQI(pm25: number, pm10: number, o3: number): number {
  // Simplified AQI calculation based on PM2.5, PM10, and O3
  const pm25AQI = (pm25 / 35.4) * 100;
  const pm10AQI = (pm10 / 154) * 100;
  const o3AQI = (o3 / 0.070) * 100;
  
  return Math.round(Math.max(pm25AQI, pm10AQI, o3AQI));
}

