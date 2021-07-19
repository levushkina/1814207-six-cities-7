import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { createMemoryHistory } from 'history';
import Favorites from './favorites';
import { mockOffers } from '../../mock/test-mocks';
import { AppRoute, AuthorizationStatus } from '../../const';


const mockStore = configureStore({});
let history = null;
let store = mockStore({});

describe('Component: Favorites', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should correct render Favorites', () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      OFFER: {offers: mockOffers, offersIsLoaded: true, favorites: [1, 2], favoritesIsLoaded: true},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    mockOffers.forEach((offer) => expect(screen.getByText(offer.title)).toBeInTheDocument());
  });

  it('should correct render Favorites when favorites empty', () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      OFFER: {offers: mockOffers, offersIsLoaded: true, favorites: [], favoritesIsLoaded: true},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('should correct render Favorites when favorites not loaded', () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      OFFER: {offers: mockOffers, offersIsLoaded: true, favorites: [], favoritesIsLoaded: false},
      dispatch: jest.fn(),
    });

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should redirect to "/login" when user no auth', () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
      OFFER: {offers: mockOffers, offersIsLoaded: true, favorites: [], favoritesIsLoaded: true},
      dispatch: jest.fn(),
    });

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    history.push(AppRoute.FAVORITES);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.SIGN_IN}>
            <h1>This is SignIn page</h1>
          </Route>
          <Favorites />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/This is SignIn page/i)).toBeInTheDocument();
  });

});
