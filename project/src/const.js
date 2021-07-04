export const MAX_RATING = 5;

export const AppRoute = {
  MAIN: '/',
  SIGN_IN: '/login',
  FAVORITES: '/favorites',
  OFFER: '/offer/:id?',
};

export const RATINGS = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

export const URL_MARKER_DEFAULT = '../img/pin.svg';

export const URL_MARKER_CURRENT = '../img/pin-active.svg';

export const PlacesListType = {
  NEAR: 'NEAR',
  MAIN: 'MAIN',
};

export const PlacesListClassName = {
  NEAR: 'near-places__list ',
  MAIN: 'cities__places-list',
};

export const PlaceCardClassName = {
  NEAR: 'near-places__card',
  MAIN: 'cities__place-card',
};

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const DEFAULT_CITY = 'Paris';

export const sortOption = {
  DEFAULT: 'Popular',
  PRICE_LOW: 'Price: low to high',
  PRICE_HIGH: 'Price: high to low',
  RATING: 'Top rated first',
};

export const SORT_TYPES = ['DEFAULT', 'PRICE_LOW', 'PRICE_HIGH', 'RATING'];

export const APIRoute = {
  OFFERS: '/hotels',
  LOGIN: '/login',
  LOGOUT: '/logout',
};
