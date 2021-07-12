import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewsItem from './reviews-item';


const mockReview = {
  comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  date: '2019-05-08T14:13:56.569Z',
  id: 1,
  rating: 4,
  user: {
    avatarUrl: 'img/1.png',
    id: 4,
    is_pro: false,
    name: 'Max'
  }
};

describe('Component: ReviewsItem', () => {
  it('should render ReviewsItem', () => {
    render(
      <ReviewsItem review={mockReview}/>
    );

    expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
    expect(screen.getByText('Max')).toBeInTheDocument();
    expect(screen.getByText('A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.')).toBeInTheDocument();
    expect(screen.getByText('May 2019')).toBeInTheDocument();
  });
});
