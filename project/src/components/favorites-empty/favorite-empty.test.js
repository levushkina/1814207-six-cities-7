import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FavoritesEmpty from './favorites-empty';


const history = createMemoryHistory();
const mockStore = configureStore({});

describe('Component: FavoritesEmpty', () => {
  const store = mockStore({USER: {userEmail: ''}});

  it('should render FavoritesEmpty', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesEmpty />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Favorites (empty)')).toBeInTheDocument();
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });
});
