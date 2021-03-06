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
      />,
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
        reviewIsSending
      />,
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
      />,
    );

    const checkbox = screen.getByTestId('rating-checkbox');

    expect(checkbox).toBeChecked();
  });

  it('onRatingChange should called when user choose rating', () => {
    const onRatingChange = jest.fn();
    const fakeId = 3;

    render(
      <Rating
        name='perfect'
        value={fakeId}
        reviewRating={5}
        onRatingChange={onRatingChange}
        reviewIsSending={false}
      />,
    );

    userEvent.click(screen.getByTestId('rating-checkbox'));
    expect(onRatingChange).toBeCalled();
    expect(onRatingChange).nthCalledWith(1, fakeId);
  });

  it('should checked when user clicked', () => {
    const fakeId = 2;

    const {rerender} = render(
      <Rating
        name='perfect'
        value={fakeId}
        reviewRating={5}
        onRatingChange={jest.fn()}
        reviewIsSending={false}
      />);

    expect(screen.getByTestId('rating-checkbox')).not.toBeChecked();

    rerender(
      <Rating
        name='perfect'
        value={fakeId}
        reviewRating={fakeId}
        onRatingChange={jest.fn()}
        reviewIsSending={false}
      />);

    expect(screen.getByTestId('rating-checkbox')).toBeChecked();
  });
});
