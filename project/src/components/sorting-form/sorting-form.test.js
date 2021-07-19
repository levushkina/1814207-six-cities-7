import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortingForm from './sorting-form';
import { sortOption, SORT_TYPES } from '../../const';


describe('Component: SortingForm', () => {
  it('should render SortingForm', () => {
    render(
      <SortingForm onSortTypeChange={jest.fn()} sortType={sortOption.PRICE_LOW}/>
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getByText(/Popular/i)).toBeInTheDocument();
    expect(screen.getByText(/Top rated first/i)).toBeInTheDocument();
  });

  it('should change  sortOptions list class on form click', () => {
    const {container} = render(
      <SortingForm onSortTypeChange={jest.fn()} sortType={sortOption.PRICE_LOW}/>
    );

    expect(container.querySelector('.places__options')).not.toHaveClass('places__options--opened');
    userEvent.click(container.querySelector('.places__sorting'));
    expect(container.querySelector('.places__options')).toHaveClass('places__options--opened');
  });
});
