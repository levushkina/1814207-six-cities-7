import React from 'react';
import { render, screen } from '@testing-library/react';
import CitiestList from './cities-list';


const mockCities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf']

describe('Component: CitiestList', () => {
  it('should render CitiestList', () => {
    render(
      <CitiestList cities={mockCities} currentCity='Paris' onCityChange={jest.fn()}/>
    );

    mockCities.forEach((name) => expect(screen.getByText(name)).toBeInTheDocument());
  });
});
