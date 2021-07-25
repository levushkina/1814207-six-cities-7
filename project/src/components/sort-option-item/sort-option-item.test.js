import React from 'react';
import { render, screen } from '@testing-library/react';
import SortOptionItem from './sort-option-item';
import userEvent from '@testing-library/user-event';


describe('Component: SortOptionItem', () => {
  it('should render SortOptionItem', () => {
    render(
      <SortOptionItem type='PRICE_LOW' sortType='Popular' onSortTypeChange={jest.fn()}/>,
    );

    expect(screen.getByText('Price: low to high')).toBeInTheDocument();
  });

  it('onSortTypeChange should calls when user select sort type', () => {
    const onSortTypeChange = jest.fn();
    render(
      <SortOptionItem type='PRICE_LOW' sortType='Popular' onSortTypeChange={onSortTypeChange}/>,
    );


    userEvent.click(screen.getByText('Price: low to high'));
    expect(onSortTypeChange).toBeCalled();
    expect(onSortTypeChange).nthCalledWith(1, 'Price: low to high');
  });
});
