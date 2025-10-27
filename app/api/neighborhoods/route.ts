import { NextResponse } from 'next/server';
import { mockNeighborhoods } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zone = searchParams.get('zone');
  const qualityLevel = searchParams.get('qualityLevel');

  let filteredNeighborhoods = [...mockNeighborhoods];

  if (zone && zone !== 'all') {
    filteredNeighborhoods = filteredNeighborhoods.filter(
      (n) => n.zone === zone
    );
  }

  if (qualityLevel && qualityLevel !== 'all') {
    filteredNeighborhoods = filteredNeighborhoods.filter(
      (n) => n.currentQuality === qualityLevel
    );
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json(filteredNeighborhoods);
}

