import { render, screen } from '@testing-library/react';
import { NeighborhoodsList } from '@/components/neighborhoods-list';
import { Neighborhood } from '@/types/air-quality';

const mockNeighborhoods: Neighborhood[] = [
  {
    id: '1',
    name: 'Copacabana',
    zone: 'Zona Sul',
    coordinates: { lat: -22.9711, lng: -43.1822 },
    currentAQI: 45,
    currentQuality: 'good',
    lastUpdate: new Date().toISOString(),
    measurements: [],
  },
  {
    id: '2',
    name: 'Ipanema',
    zone: 'Zona Sul',
    coordinates: { lat: -22.9838, lng: -43.2044 },
    currentAQI: 52,
    currentQuality: 'moderate',
    lastUpdate: new Date().toISOString(),
    measurements: [],
  },
];

describe('NeighborhoodsList', () => {
  it('should render loading skeletons when loading', () => {
    const { container } = render(<NeighborhoodsList neighborhoods={[]} loading={true} />);
    // Check for skeleton class instead of data-testid
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should render empty message when no neighborhoods', () => {
    render(<NeighborhoodsList neighborhoods={[]} loading={false} />);
    expect(screen.getByText(/Nenhum bairro encontrado/i)).toBeInTheDocument();
  });

  it('should render neighborhood cards when data is provided', () => {
    render(<NeighborhoodsList neighborhoods={mockNeighborhoods} loading={false} />);
    expect(screen.getByText('Copacabana')).toBeInTheDocument();
    expect(screen.getByText('Ipanema')).toBeInTheDocument();
  });

  it('should render correct number of neighborhood cards', () => {
    render(<NeighborhoodsList neighborhoods={mockNeighborhoods} loading={false} />);
    const cards = screen.getAllByText(/Zona Sul/i);
    expect(cards).toHaveLength(2);
  });
});

