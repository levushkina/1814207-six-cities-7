import React from 'react';
import { render , screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import NotFound from './not-found';


const mockStore = configureStore({});

describe('Component: NotFound', () => {
  const store = mockStore({USER: {userEmail: ''}});
  const history = createMemoryHistory();

  it('should render NotFound correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <NotFound/>
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Page not found!')).toBeInTheDocument();
    expect(screen.getByText('Back to main page')).toBeInTheDocument();
  });
});
