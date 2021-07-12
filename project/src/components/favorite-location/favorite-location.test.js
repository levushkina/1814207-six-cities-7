import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FavoriteLocation from './favorite-location';


const mockPlacesGroupByCity = [
  {
    bedrooms: 3,
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
  },
  {
    bedrooms: 2,
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
    id: 2,
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
    price: 150,
    rating: 4.8,
    type: 'house',
    title: 'studio at great location',
  },
];

const history = createMemoryHistory();
const mockStore = configureStore({});

describe('Component: FavoriteLocation', () => {
  const store = mockStore({});

  it('should render FavoriteLocation', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoriteLocation city='Amsterdam' places={mockPlacesGroupByCity}/>
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    mockPlacesGroupByCity.forEach((place) => {
      expect(screen.getByText(place.title)).toBeInTheDocument();
      expect(screen.getByText(place.type)).toBeInTheDocument();
    });
  });
});
