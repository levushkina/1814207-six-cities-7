import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PlaceCard from './place-card';


const mockOffer = {
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
  isPremium: true,
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
};

const history = createMemoryHistory();
const mockStore = configureStore({});

describe('Component: PlaceCard', () => {
  const store = mockStore({});

  it('should render PlaceCard', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <PlaceCard place={mockOffer} onPlaceMouseOver={jest.fn()} type='NEAR'/>
        </Router>
      </Provider>,
    );

    expect(screen.getByAltText('Place image')).toBeInTheDocument();
    expect(screen.getByText(/120/i)).toBeInTheDocument();
    expect(screen.getByText('Beautiful & luxurious studio at great location')).toBeInTheDocument();
    expect(screen.getByText('apartment')).toBeInTheDocument();
  });
});
