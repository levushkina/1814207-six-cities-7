import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import ReactRouter from 'react-router';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { createMemoryHistory } from 'history';
import Offer from './offer';
import { mockOffers, mockReviews } from '../../mock/test-mocks';
import { AppRoute, AuthorizationStatus } from '../../const';


const mockStore = configureStore({});
let history = createMemoryHistory({});

let store = mockStore({});
const mockOffer = mockOffers[0];

describe('Component: Offer', () => {
  it('should correct render Offer', () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      OFFER: {offers: mockOffers, offersIsLoaded: true, offersNearby: [2], offersNearbyIsLoaded: true},
      REVIEW: {reviews: [], reviewsIsLoaded: true},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: `${mockOffer.id}` });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Offer />
        </Router>
      </Provider>,
    );

    mockOffer.goods.forEach((good) => expect(screen.getByText(good)).toBeInTheDocument());
    expect(screen.getByText(mockOffer.host.name)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render LoadingScreen when offerItem not loaded', () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      OFFER: {offers: [], offersIsLoaded: false, offersNearby: [2], offersNearbyIsLoaded: true},
      REVIEW: {reviews: [], reviewsIsLoaded: true},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: `${mockOffer.id}` });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Offer />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
  });

  it('should redirect to "/404" when offerItem not found', () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      OFFER: {offers: mockOffers, offersIsLoaded: true, offersNearby: [2], offersNearbyIsLoaded: true},
      REVIEW: {reviews: [], reviewsIsLoaded: true},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '110' });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.NOT_FOUND}>
            <h1>This is 404 page</h1>
          </Route>
            <Offer />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/This is 404 page/i)).toBeInTheDocument();
  });

  it('should no render offersNearby when offersNearby not loaded', () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      OFFER: {offers: mockOffers, offersIsLoaded: true, offersNearby: [], offersNearbyIsLoaded: false},
      REVIEW: {reviews: [], reviewsIsLoaded: true},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: `${mockOffer.id}` });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Offer />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Other places in the neighbourhood/i)).not.toBeInTheDocument();
  });


  it('should render premium label if isPremium true', () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      OFFER: {offers: mockOffers, offersIsLoaded: true, offersNearby: [], offersNearbyIsLoaded: false},
      REVIEW: {reviews: [], reviewsIsLoaded: true},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: `${mockOffers[1].id}` });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Offer />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
  });

  it('should render premium label if isPremium false', () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      OFFER: {offers: mockOffers, offersIsLoaded: true, offersNearby: [], offersNearbyIsLoaded: false},
      REVIEW: {reviews: [], reviewsIsLoaded: true},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: `${mockOffer.id}` });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Offer />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Premium/i)).not.toBeInTheDocument();
  });

  it('should render pro label for host', () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      OFFER: {offers: mockOffers, offersIsLoaded: true, offersNearby: [], offersNearbyIsLoaded: false},
      REVIEW: {reviews: [], reviewsIsLoaded: true},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: `${mockOffer.id}` });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Offer />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Pro/i)).toBeInTheDocument();
  });

  it('should render pro label for host', () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      OFFER: {offers: mockOffers, offersIsLoaded: true, offersNearby: [], offersNearbyIsLoaded: false},
      REVIEW: {reviews: [], reviewsIsLoaded: true},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: `${mockOffers[1].id}` });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Offer />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Pro/i)).not.toBeInTheDocument();
  });

  it('should no render OffersReviews when reviews is not loaded', () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      OFFER: {offers: mockOffers, offersIsLoaded: true, offersNearby: [], offersNearbyIsLoaded: false},
      REVIEW: {reviews: mockReviews, reviewsIsLoaded: false},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: `${mockOffer.id}` });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Offer />
        </Router>
      </Provider>,
    );

    mockReviews.forEach((review) => expect(screen.queryByText(review.comment)).not.toBeInTheDocument());
  });
});
