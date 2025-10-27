import {
  getAQILevel,
  getAQIColor,
  getAQILabel,
  getAQIDescription,
  calculateAQI,
} from '@/lib/air-quality-utils';

describe('Air Quality Utils', () => {
  describe('getAQILevel', () => {
    it('should return "good" for AQI <= 50', () => {
      expect(getAQILevel(30)).toBe('good');
      expect(getAQILevel(50)).toBe('good');
    });

    it('should return "moderate" for AQI between 51 and 100', () => {
      expect(getAQILevel(51)).toBe('moderate');
      expect(getAQILevel(100)).toBe('moderate');
    });

    it('should return "unhealthy" for AQI between 101 and 150', () => {
      expect(getAQILevel(101)).toBe('unhealthy');
      expect(getAQILevel(150)).toBe('unhealthy');
    });

    it('should return "hazardous" for AQI > 150', () => {
      expect(getAQILevel(151)).toBe('hazardous');
      expect(getAQILevel(200)).toBe('hazardous');
      expect(getAQILevel(300)).toBe('hazardous');
    });
  });

  describe('getAQIColor', () => {
    it('should return correct color classes for each level', () => {
      expect(getAQIColor('good')).toBe('bg-green-500');
      expect(getAQIColor('moderate')).toBe('bg-yellow-500');
      expect(getAQIColor('unhealthy')).toBe('bg-orange-500');
      expect(getAQIColor('hazardous')).toBe('bg-purple-900');
    });
  });

  describe('getAQILabel', () => {
    it('should return correct Portuguese labels', () => {
      expect(getAQILabel('good')).toBe('Bom');
      expect(getAQILabel('moderate')).toBe('Moderado');
      expect(getAQILabel('unhealthy')).toBe('Ruim');
      expect(getAQILabel('hazardous')).toBe('Péssimo');
    });
  });

  describe('getAQIDescription', () => {
    it('should return descriptions for each level', () => {
      expect(getAQIDescription('good')).toContain('satisfatória');
      expect(getAQIDescription('moderate')).toContain('aceitável');
      expect(getAQIDescription('unhealthy')).toContain('grupos sensíveis');
      expect(getAQIDescription('hazardous')).toContain('Emergência');
    });
  });

  describe('calculateAQI', () => {
    it('should calculate AQI based on pollutant levels', () => {
      const aqi = calculateAQI(35.4, 154, 0.070);
      expect(aqi).toBeGreaterThan(0);
      expect(aqi).toBeLessThanOrEqual(200);
    });

    it('should return higher AQI for higher pollutant levels', () => {
      const lowAQI = calculateAQI(10, 50, 0.020);
      const highAQI = calculateAQI(50, 200, 0.100);
      expect(highAQI).toBeGreaterThan(lowAQI);
    });
  });
});

