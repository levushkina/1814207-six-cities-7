import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LoadingScreen from './loading-screen';


const history = createMemoryHistory();
const mockStore = configureStore({});

describe('Component: LoadingScreen', () => {
  const store = mockStore({USER: {userEmail: ''}});

  it('should render LoadingScreen', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <LoadingScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });
});
