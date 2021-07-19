import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import City from './city';
import { BookmarkClass } from '../../const';


describe('Component: City', () => {
  it('should render City', () => {
    render(
      <City city='Amsterdam' currentCity='Paris' onCityChange={jest.fn()}/>
    );

    expect(screen.getByText(/Amsterdam/i)).toBeInTheDocument();
  });

  it('onChange should called when user choose city', () => {
    const onChange = jest.fn();

    render(
      <City city='Amsterdam' currentCity='Paris' onCityChange={onChange}/>
    );

    userEvent.click(screen.getByText('Amsterdam'));
    expect(onChange).toBeCalled();
    expect(onChange).nthCalledWith(1, 'Amsterdam');
  });
});
