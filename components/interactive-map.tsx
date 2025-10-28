'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Neighborhood } from '@/types/air-quality';
import { getAQIColor, getAQILabel } from '@/lib/air-quality-utils';
import { useRouter } from 'next/navigation';

interface InteractiveMapProps {
  neighborhoods: Neighborhood[];
}

export function InteractiveMap({ neighborhoods }: InteractiveMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map only once
    if (!mapRef.current) {
      // Center on Rio de Janeiro
      const map = L.map(mapContainerRef.current).setView([-22.9068, -43.1729], 11);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;
    }

    // Clear existing markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer);
      }
    });

    // Add markers for each neighborhood
    neighborhoods.forEach((neighborhood) => {
      if (!mapRef.current) return;

      // Get color based on quality level
      const colorClass = getAQIColor(neighborhood.currentQuality);
      const colorMap: Record<string, string> = {
        'bg-green-500': '#22c55e',
        'bg-yellow-500': '#eab308',
        'bg-orange-500': '#f97316',
        'bg-red-500': '#ef4444',
        'bg-purple-900': '#581c87',
      };
      const color = colorMap[colorClass] || '#6b7280';

      // Create custom colored marker
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background-color: ${color};
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            font-size: 12px;
          ">
            ${neighborhood.currentAQI}
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
      });

      const marker = L.marker(
        [neighborhood.coordinates.lat, neighborhood.coordinates.lng],
        { icon: customIcon }
      ).addTo(mapRef.current);

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">${neighborhood.name}</h3>
          <p style="margin: 4px 0; color: #666;">📍 ${neighborhood.zone}</p>
          <p style="margin: 4px 0;">
            <span style="font-weight: bold;">IQA:</span> ${neighborhood.currentAQI}
          </p>
          <p style="margin: 4px 0;">
            <span style="font-weight: bold;">Qualidade:</span> 
            <span style="color: ${color}; font-weight: bold;">${getAQILabel(neighborhood.currentQuality)}</span>
          </p>
          <p style="margin: 8px 0 4px 0; font-size: 12px; color: #666;">
            Clique no marcador para ver detalhes
          </p>
        </div>
      `;

      marker.bindPopup(popupContent);

      // Navigate to detail page on click
      marker.on('click', () => {
        router.push(`/neighborhood/${neighborhood.id}`);
      });

      // Open popup on hover
      marker.on('mouseover', () => {
        marker.openPopup();
      });
    });

    // Cleanup function
    return () => {
      // Don't destroy the map on cleanup, just clear markers
    };
  }, [neighborhoods, router]);

  // Cleanup map on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden border">
      <div ref={mapContainerRef} className="w-full h-full" />
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-1000">
        <h4 className="font-bold mb-2 text-sm">Legenda</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span>Bom (0-50)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span>Moderado (51-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span>Ruim (101-150)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-900"></div>
            <span>Péssimo (151+)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

