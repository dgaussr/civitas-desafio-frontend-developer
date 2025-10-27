import { NextResponse } from 'next/server';
import { mockNeighborhoods } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const neighborhood = mockNeighborhoods.find((n) => n.id === id);

  if (!neighborhood) {
    return NextResponse.json(
      { error: 'Neighborhood not found' },
      { status: 404 }
    );
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json(neighborhood);
}

