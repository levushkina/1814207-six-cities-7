import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Footer from './footer';

describe('Component: Footer', () => {
  const history = createMemoryHistory();

  it('should render correctly', () => {
    const {getByAltText} = render(
      <Router history={history}>
        <Footer/>
      </Router>,
    );
    const logoElement = getByAltText('6 cities logo');

    expect(logoElement).toBeInTheDocument();
  });

  it('should redirect to "/" when user click on link', () => {
    render(
      <Router history={history}>
        <Footer/>
        <Route exact path="/">
          <h1>Main page</h1>
        </Route>
      </Router>,
    );

    userEvent.click(screen.getByTestId('logo'));
    expect(screen.getByText('Main page')).toBeInTheDocument();
  });
});
