import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { createMemoryHistory } from 'history';
import Main from './main';
import { mockOffers } from '../../mock/test-mocks';


const mockStore = configureStore({});
let history = null;
let store = mockStore({});

describe('Component: Main', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should correct render Main', () => {
    store = mockStore({
      USER: {userEmail: ''},
      OFFER: {offers: mockOffers, offersIsLoaded: true},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Main/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
  });

  it('should render MainEmpty if offers no exist', () => {
    store = mockStore({
      USER: {userEmail: ''},
      OFFER: {offers: [], offersIsLoaded: true},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Main/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });
});
