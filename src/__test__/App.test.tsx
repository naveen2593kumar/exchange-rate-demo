import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  const exchangeRateConverter = screen.getByTestId('exchangeRateConverter');
  expect(exchangeRateConverter).toBeInTheDocument();

  const exchangeRateTrend = screen.getByTestId('exchangeRateTrend');
  expect(exchangeRateTrend).toBeInTheDocument();
});
