'use client';

import { AirQualityLevel } from '@/types/air-quality';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface FiltersProps {
  zone: string;
  qualityLevel: AirQualityLevel | 'all';
  onZoneChange: (zone: string) => void;
  onQualityLevelChange: (level: AirQualityLevel | 'all') => void;
}

export function Filters({
  zone,
  qualityLevel,
  onZoneChange,
  onQualityLevelChange,
}: FiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <Label htmlFor="zone-filter">Zona</Label>
        <Select value={zone} onValueChange={onZoneChange}>
          <SelectTrigger id="zone-filter">
            <SelectValue placeholder="Selecione uma zona" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Zonas</SelectItem>
            <SelectItem value="Zona Sul">Zona Sul</SelectItem>
            <SelectItem value="Zona Norte">Zona Norte</SelectItem>
            <SelectItem value="Zona Oeste">Zona Oeste</SelectItem>
            <SelectItem value="Centro">Centro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <Label htmlFor="quality-filter">Nível de Qualidade</Label>
        <Select value={qualityLevel} onValueChange={(value) => onQualityLevelChange(value as AirQualityLevel | 'all')}>
          <SelectTrigger id="quality-filter">
            <SelectValue placeholder="Selecione um nível" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Níveis</SelectItem>
            <SelectItem value="good">Bom</SelectItem>
            <SelectItem value="moderate">Moderado</SelectItem>
            <SelectItem value="unhealthy">Ruim</SelectItem>
            <SelectItem value="hazardous">Péssimo</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

