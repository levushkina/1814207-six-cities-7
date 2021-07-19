import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AuthorizationStatus, AppRoute, CITIES } from '../../const';
import App from './app';


const createFakeStore = configureStore({});

let store = createFakeStore({});
let history = null;
let fakeApp = null;
let mockOffers = [];

describe('Application Routing', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    mockOffers = [{
      bedRooms: 3,
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10,
        },
      },
      description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      goods: ['Heating', 'Kitchen', 'Washing machine', 'Air conditioning'],
      host: {
        id: 3,
        name: 'Angelina',
        avatarUrl: 'img/avatar-angelina.jpg',
        isPro: true,
      },
      id: 1,
      images: [
        'https://7.react.pages.academy/static/hotel/20.jpg',
        'https://7.react.pages.academy/static/hotel/15.jpg',
      ],
      isFavorite: false,
      isPremium: false,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
      maxAdults: 4,
      previewImage: 'https://7.react.pages.academy/static/hotel/14.jpg',
      price: 120,
      rating: 4.8,
      type: 'apartment',
      title: 'Beautiful & luxurious studio at great location',
    }];

    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      OFFER: {offers: mockOffers, offersIsLoaded: true, favorites: [], favoritesItemIsLoaded: true, offersNearby: []},
      REVIEW: {reviewsIsLoaded: true, reviews: []},
      dispatch: jest.fn(),
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  });

  it('should render Main when user navigate to "/"', () => {
    history.push(AppRoute.MAIN);
    render(fakeApp);

    CITIES.forEach((name) => expect(screen.getByText(name)).toBeInTheDocument());
    expect(screen.getByText(/places to stay in Paris/i)).toBeInTheDocument();

  });

  it('should render "Room" when user navigate to "/offer"', () => {
    history.push(AppRoute.OFFER);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.OFFER}>
            <h1>
              Offer room
            </h1>
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Offer room/i)).toBeInTheDocument();
  });

  it('should render "Favorites" when user navigate to "/favorites"', () => {
    history.push(AppRoute.FAVORITES);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.FAVORITES}>
            <h1>Favorite room</h1>
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Favorite room/i)).toBeInTheDocument();
  });


  it('should render NotFound when user navigate to non-existed route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('Page not found!')).toBeInTheDocument();
    expect(screen.getByText('Back to main page')).toBeInTheDocument();
  });

  it('should render SignIn when user navigate to "/login"', () => {
    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
      OFFER: {offers: mockOffers, offersIsLoaded: true},
    });
    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );

    history.push(AppRoute.SIGN_IN);
    render(fakeApp);

    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
  });

  it('should render LoadingScreen when offers is no loaded', () => {
    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
      OFFER: {offers: [], offersIsLoaded: false},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
  });
});
