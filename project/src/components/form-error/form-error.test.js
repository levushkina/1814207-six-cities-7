import React from 'react';
import { render, screen } from '@testing-library/react';
import FormError from './form-error';


describe('Component: FormError', () => {
  it('should render FormError', () => {
    render(
      <FormError errorText='Error. Please try later' />,
    );
    expect(screen.getByText('Error. Please try later')).toBeInTheDocument();
  });
});
