import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Header from './header';


const mockStore = configureStore({});

let store;

describe('Component: Header', () => {
  beforeEach(() => {
    store = mockStore({});
  });
  it('should render correctly no auth user', () => {
    store = mockStore({USER: {userEmail: ''}});

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header/>
        </Router>
      </Provider>,
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
  });

  it('should render correctly auth user', () => {
    store = mockStore({USER: {userEmail: 'test@mail.ru'}});

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header/>
        </Router>
      </Provider>,
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByText(/test@mail.ru/i)).toBeInTheDocument();
  });
});
