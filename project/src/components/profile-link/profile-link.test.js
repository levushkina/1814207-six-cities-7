import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileLink from './profile-link';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';


const history = createMemoryHistory();

describe('Component: ProfileLink', () => {
  it('should render ProfileLink', () => {
    render(
      <Router history={history}>
        <ProfileLink userEmail='test@mail.ru' />
      </Router>
    );
    expect(screen.getByText('test@mail.ru')).toBeInTheDocument();
  });
});
