import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Rating from './rating';


describe('Component: Rating', () => {
  it('should render Rating', () => {
    render(
      <Rating
        name='perfect'
        value={5}
        reviewRating={4}
        onRatingChange={jest.fn()}
        reviewIsSending={false}
      />
    );

    const checkbox = screen.getByTestId('rating-checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('should render disabled Rating', () => {
    render(
      <Rating
        name='perfect'
        value={5}
        reviewRating={4}
        onRatingChange={jest.fn()}
        reviewIsSending={true}
      />
    );

    const checkbox = screen.getByTestId('rating-checkbox');

    expect(checkbox).toBeDisabled();
  });

  it('should render chacked Rating', () => {
    render(
      <Rating
        name='perfect'
        value={5}
        reviewRating={5}
        onRatingChange={jest.fn()}
        reviewIsSending={false}
      />
    );

    const checkbox = screen.getByTestId('rating-checkbox');

    expect(checkbox).toBeChecked();
  });
});
