import React from 'react';
import { render, screen } from '@testing-library/react';
import SortOptionItem from './sort-option-item';


describe('Component: SortOptionItem', () => {
  it('should render SortOptionItem', () => {
    render(
      <SortOptionItem type='PRICE_LOW' sortType='Popular' onSortTypeChange={jest.fn()}/>
    );

    expect(screen.getByText('Price: low to high')).toBeInTheDocument();
  });
});
