import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertyItem from './property-item';


describe('Component: PropertyItem', () => {
  it('should render PropertyItem', () => {
    render(
      <PropertyItem property='Washing machine'/>
    );

    expect(screen.getByText('Washing machine')).toBeInTheDocument();
  });
});
