import React from 'react';
import { render, screen } from '@testing-library/react';
import City from './city';
import { BookmarkClass } from '../../const';


describe('Component: City', () => {
  it('should render City', () => {
    render(
      <City city='Amsterdam' currentCity='Paris' onCityChange={jest.fn()}/>
    );

    expect(screen.getByText(/Amsterdam/i)).toBeInTheDocument();
  });
});
