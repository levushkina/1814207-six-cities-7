import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileLink from './profile-link';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { AppRoute } from '../../const';


const history = createMemoryHistory();

describe('Component: ProfileLink', () => {
  it('should render ProfileLink', () => {
    render(
      <Router history={history}>
        <ProfileLink userEmail='test@mail.ru' />
      </Router>,
    );
    expect(screen.getByText('test@mail.ru')).toBeInTheDocument();
  });

  it('should redirect to "/favorites" when user click on link', () => {
    render(
      <Router history={history}>
        <ProfileLink userEmail='test@mail.ru' />
        <Route exact path={AppRoute.FAVORITES}>
          <h1>Favorites page</h1>
        </Route>
      </Router>,
    );

    userEvent.click(screen.getByTestId('favorite'));
    expect(screen.getByText('Favorites page')).toBeInTheDocument();
  });
});
