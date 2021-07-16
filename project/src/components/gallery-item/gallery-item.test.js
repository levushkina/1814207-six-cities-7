import React from 'react';
import { render, screen } from '@testing-library/react';
import GalleryItem from './gallery-item';


describe('Component: GalleryItem', () => {
  it('should render GalleryItem', () => {
    render(
      <GalleryItem imageUrl='www.test.ru' />
    );
    expect(screen.getByAltText('Photo studio')).toBeInTheDocument();
  });
});
