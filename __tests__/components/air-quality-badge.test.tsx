import { render, screen } from '@testing-library/react';
import { AirQualityBadge } from '@/components/air-quality-badge';

describe('AirQualityBadge', () => {
  it('should render badge with correct label for good quality', () => {
    render(<AirQualityBadge level="good" />);
    expect(screen.getByText('Bom')).toBeInTheDocument();
  });

  it('should render badge with correct label for moderate quality', () => {
    render(<AirQualityBadge level="moderate" />);
    expect(screen.getByText('Moderado')).toBeInTheDocument();
  });

  it('should render badge with correct label for unhealthy quality', () => {
    render(<AirQualityBadge level="unhealthy" />);
    expect(screen.getByText('Ruim')).toBeInTheDocument();
  });

  it('should render badge with correct label for hazardous quality', () => {
    render(<AirQualityBadge level="hazardous" />);
    expect(screen.getByText('Péssimo')).toBeInTheDocument();
  });

  it('should apply custom className when provided', () => {
    const { container } = render(<AirQualityBadge level="good" className="custom-class" />);
    const badge = container.querySelector('.custom-class');
    expect(badge).toBeInTheDocument();
  });
});

