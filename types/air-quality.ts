export type AirQualityLevel = 'good' | 'moderate' | 'unhealthy' | 'hazardous';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface AirQualityMeasurement {
  timestamp: string;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
  aqi: number;
}

export interface Neighborhood {
  id: string;
  name: string;
  zone: string;
  coordinates: Coordinates;
  currentQuality: AirQualityLevel;
  currentAQI: number;
  lastUpdate: string;
  measurements: AirQualityMeasurement[];
}

export interface AirQualityFilters {
  neighborhood?: string;
  qualityLevel?: AirQualityLevel | 'all';
  zone?: string;
}

export interface AirQualityStats {
  average: number;
  min: number;
  max: number;
  trend: 'improving' | 'stable' | 'worsening';
}

