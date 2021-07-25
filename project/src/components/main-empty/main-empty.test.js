import React from 'react';
import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';


describe('Component: MainEmpty', () => {
  it('should render MainEmpty', () => {
    render(
      <MainEmpty />,
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText('We could not find any property available at the moment in Dusseldorf')).toBeInTheDocument();
  });
});
