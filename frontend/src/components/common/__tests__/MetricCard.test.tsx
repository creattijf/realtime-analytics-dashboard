import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MetricCard from '../MetricCard';

describe('MetricCard', () => {
  const defaultProps = {
    title: 'Total Revenue',
    value: 45231,
    format: 'currency' as const,
    icon: '💰',
    color: 'purple' as const,
  };

  it('should render metric title', () => {
    render(<MetricCard {...defaultProps} />);
    
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
  });

  it('should format currency correctly', () => {
    render(<MetricCard {...defaultProps} />);
    
    expect(screen.getByText(/\$45,231/)).toBeInTheDocument();
  });

  it('should display positive change indicator', () => {
    render(<MetricCard {...defaultProps} changePercent={12.5} />);
    
    const changeElement = screen.getByText(/\+12\.5%/);
    expect(changeElement).toBeInTheDocument();
  });

  it('should display negative change indicator', () => {
    render(<MetricCard {...defaultProps} changePercent={-5.2} />);
    
    const changeElement = screen.getByText(/-5\.2%/);
    expect(changeElement).toBeInTheDocument();
  });

  it('should render icon', () => {
    render(<MetricCard {...defaultProps} />);
    
    expect(screen.getByText('💰')).toBeInTheDocument();
  });

  it('should format numbers correctly', () => {
    render(<MetricCard {...defaultProps} value={8420} format="number" />);
    
    expect(screen.getByText('8,420')).toBeInTheDocument();
  });

  it('should format percentage correctly', () => {
    render(<MetricCard {...defaultProps} value={94.5} format="percentage" />);
    
    expect(screen.getByText(/94\.5%/)).toBeInTheDocument();
  });
});