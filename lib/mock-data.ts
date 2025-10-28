import { Neighborhood, AirQualityMeasurement } from '@/types/air-quality';
import { getAQILevel } from './air-quality-utils';

function generateMeasurements(baseAQI: number, days: number = 7): AirQualityMeasurement[] {
  const measurements: AirQualityMeasurement[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Add some variation to the measurements
    const variation = (Math.random() - 0.5) * 20;
    const aqi = Math.max(0, Math.min(200, baseAQI + variation));
    
    // Calculate pollutant levels based on AQI
    const pm25 = (aqi / 100) * 35.4 * (0.8 + Math.random() * 0.4);
    const pm10 = (aqi / 100) * 154 * (0.8 + Math.random() * 0.4);
    const o3 = (aqi / 100) * 0.070 * (0.8 + Math.random() * 0.4);
    const no2 = (aqi / 100) * 0.100 * (0.8 + Math.random() * 0.4);
    const so2 = (aqi / 100) * 0.075 * (0.8 + Math.random() * 0.4);
    const co = (aqi / 100) * 9.4 * (0.8 + Math.random() * 0.4);

    measurements.push({
      timestamp: date.toISOString(),
      pm25: Math.round(pm25 * 10) / 10,
      pm10: Math.round(pm10 * 10) / 10,
      o3: Math.round(o3 * 1000) / 1000,
      no2: Math.round(no2 * 1000) / 1000,
      so2: Math.round(so2 * 1000) / 1000,
      co: Math.round(co * 10) / 10,
      aqi: Math.round(aqi),
    });
  }

  return measurements;
}

export const mockNeighborhoods: Neighborhood[] = [
  {
    id: '1',
    name: 'Copacabana',
    zone: 'Zona Sul',
    coordinates: { lat: -22.9711, lng: -43.1822 },
    currentAQI: 45,
    currentQuality: 'good',
    lastUpdate: new Date().toISOString(),
    measurements: generateMeasurements(45),
  },
  {
    id: '2',
    name: 'Ipanema',
    zone: 'Zona Sul',
    coordinates: { lat: -22.9838, lng: -43.2044 },
    currentAQI: 52,
    currentQuality: 'moderate',
    lastUpdate: new Date().toISOString(),
    measurements: generateMeasurements(52),
  },
  {
    id: '3',
    name: 'Leblon',
    zone: 'Zona Sul',
    coordinates: { lat: -22.9844, lng: -43.2205 },
    currentAQI: 38,
    currentQuality: 'good',
    lastUpdate: new Date().toISOString(),
    measurements: generateMeasurements(38),
  },
  {
    id: '4',
    name: 'Barra da Tijuca',
    zone: 'Zona Oeste',
    coordinates: { lat: -23.0050, lng: -43.3647 },
    currentAQI: 68,
    currentQuality: 'moderate',
    lastUpdate: new Date().toISOString(),
    measurements: generateMeasurements(68),
  },
  {
    id: '5',
    name: 'Centro',
    zone: 'Centro',
    coordinates: { lat: -22.9035, lng: -43.2096 },
    currentAQI: 95,
    currentQuality: 'moderate',
    lastUpdate: new Date().toISOString(),
    measurements: generateMeasurements(95),
  },
  {
    id: '6',
    name: 'Tijuca',
    zone: 'Zona Norte',
    coordinates: { lat: -22.9249, lng: -43.2344 },
    currentAQI: 72,
    currentQuality: 'moderate',
    lastUpdate: new Date().toISOString(),
    measurements: generateMeasurements(72),
  },
  {
    id: '7',
    name: 'Botafogo',
    zone: 'Zona Sul',
    coordinates: { lat: -22.9519, lng: -43.1875 },
    currentAQI: 58,
    currentQuality: 'moderate',
    lastUpdate: new Date().toISOString(),
    measurements: generateMeasurements(58),
  },
  {
    id: '8',
    name: 'Flamengo',
    zone: 'Zona Sul',
    coordinates: { lat: -22.9322, lng: -43.1759 },
    currentAQI: 62,
    currentQuality: 'moderate',
    lastUpdate: new Date().toISOString(),
    measurements: generateMeasurements(62),
  },
  {
    id: '9',
    name: 'Jacarepaguá',
    zone: 'Zona Oeste',
    coordinates: { lat: -22.9333, lng: -43.3667 },
    currentAQI: 88,
    currentQuality: 'moderate',
    lastUpdate: new Date().toISOString(),
    measurements: generateMeasurements(88),
  },
  {
    id: '10',
    name: 'Méier',
    zone: 'Zona Norte',
    coordinates: { lat: -22.9025, lng: -43.2781 },
    currentAQI: 105,
    currentQuality: 'unhealthy',
    lastUpdate: new Date().toISOString(),
    measurements: generateMeasurements(105),
  },
  {
    id: '11',
    name: 'Campo Grande',
    zone: 'Zona Oeste',
    coordinates: { lat: -22.9017, lng: -43.5625 },
    currentAQI: 118,
    currentQuality: 'unhealthy',
    lastUpdate: new Date().toISOString(),
    measurements: generateMeasurements(118),
  },
  {
    id: '12',
    name: 'Bangu',
    zone: 'Zona Oeste',
    coordinates: { lat: -22.8711, lng: -43.4656 },
    currentAQI: 132,
    currentQuality: 'unhealthy',
    lastUpdate: new Date().toISOString(),
    measurements: generateMeasurements(132),
  },
  {
    id: '13',
    name: 'Santa Cruz',
    zone: 'Zona Oeste',
    coordinates: { lat: -22.9197, lng: -43.6869 },
    currentAQI: 178,
    currentQuality: 'hazardous',
    lastUpdate: new Date().toISOString(),
    measurements: generateMeasurements(178),
  },
  {
    id: '14',
    name: 'Ilha do Governador',
    zone: 'Zona Norte',
    coordinates: { lat: -22.8100, lng: -43.2089 },
    currentAQI: 78,
    currentQuality: 'moderate',
    lastUpdate: new Date().toISOString(),
    measurements: generateMeasurements(78),
  },
  {
    id: '15',
    name: 'Recreio',
    zone: 'Zona Oeste',
    coordinates: { lat: -23.0197, lng: -43.4464 },
    currentAQI: 42,
    currentQuality: 'good',
    lastUpdate: new Date().toISOString(),
    measurements: generateMeasurements(42),
  },
  {
    id: '16',
    name: 'Campo Grande',
    zone: 'Zona Oeste',
    coordinates: { lat: -22.9006, lng: -43.5617 },
    currentAQI: 215,
    currentQuality: 'hazardous',
    lastUpdate: new Date().toISOString(),
    measurements: generateMeasurements(215),
  },
];

// Update quality levels based on current AQI
mockNeighborhoods.forEach(neighborhood => {
  neighborhood.currentQuality = getAQILevel(neighborhood.currentAQI);
});

