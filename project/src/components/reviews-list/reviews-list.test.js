import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { mockReviews } from '../../mock/test-mocks';


describe('Component: ReviewsList', () => {
  it('should render ReviewsList', () => {
    render(
      <ReviewsList reviews={mockReviews}/>
    );

    mockReviews.forEach((review) => expect(screen.getByText(review.comment)).toBeInTheDocument());
  });
});
