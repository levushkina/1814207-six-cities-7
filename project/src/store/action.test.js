import {
  loadOffers,
  requiredAuthorization,
  closeSession,
  redirectToRoute,
  loadOffersNearby,
  loadReviews,
  addReview,
  changeReviewSendingStatus,
  showReviewPostError,
  fetchOffersNearbyError,
  fetchReviewsError,
  loginError,
  updateOffer,
  loadFavorites,
  ActionType
} from './action';

const mockOffers = [{
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

describe('Actions', () => {
  it('action creator for loafing offers returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFERS,
      payload: mockOffers,
    };

    expect(loadOffers(mockOffers)).toEqual(expectedAction);
  });

  it('action creator for getting authorization status returns correct action', () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: {
        status: 'AUTH',
        email: 'test@mail.ru',
      },
    };

    expect(requiredAuthorization({
      status: 'AUTH',
      email: 'test@mail.ru',
    })).toEqual(expectedAction);
  });

  it('action creator for logout user returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOGOUT,
    };

    expect(closeSession()).toEqual(expectedAction);
  });

  it('action creator for redirect to url returns correct action', () => {
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: '/login',
    };

    expect(redirectToRoute('/login')).toEqual(expectedAction);
  });

  it('action creator for loading offers nearby returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFERS_NEARBY,
      payload: mockOffers,
    };

    expect(loadOffersNearby(mockOffers)).toEqual(expectedAction);
  });

  it('action creator for loading reviews returns correct action', () => {
    const mockReviews = [{
      comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      date: '2019-05-08T14:13:56.569Z',
      id: 1,
      rating: 4,
      user: {
        avatarUrl: 'img/1.png',
        id: 4,
        is_pro: false,
        name: 'Max'
      }
    }];
    const expectedAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: mockReviews,
    };

    expect(loadReviews(mockReviews)).toEqual(expectedAction);
  });

  it('action creator for adding reviews returns correct action', () => {
    const newReview = {
      comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      rating: 4,
    }

    const expectedAction = {
      type: ActionType.ADD_REVIEW,
      payload: newReview,
    };

    expect(addReview(newReview)).toEqual(expectedAction);
  });

  it('action creator for changing reviews sending status returns correct action', () => {
    const expectedAction = {
      type: ActionType.CHANGE_REVIEW_SENDING_STATUS,
      payload: true,
    };

    expect(changeReviewSendingStatus(true)).toEqual(expectedAction);
  });

  it('action creator for offers nearby errors returns correct action', () => {
    const expectedAction = {
      type: ActionType.FETCH_OFFERS_NEARBY_ERROR,
    };

    expect(fetchOffersNearbyError()).toEqual(expectedAction);
  });

  it('action creator for reviews errors returns correct action', () => {
    const expectedAction = {
      type: ActionType.FETCH_REVIEWS_ERROR,
    };

    expect(fetchReviewsError()).toEqual(expectedAction);
  });

  it('action creator for login errors returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOGIN_ERROR,
    };

    expect(loginError()).toEqual(expectedAction);
  });

  it('action creator for updating offer returns correct action', () => {
    const expectedAction = {
      type: ActionType.UPDATE_OFFER,
      payload: mockOffers,
    };

    expect(updateOffer(mockOffers)).toEqual(expectedAction);
  });

  it('action creator for loading favorite offer returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOAD_FAVORITES,
      payload: mockOffers,
    };

    expect(loadFavorites(mockOffers)).toEqual(expectedAction);
  });

  it('action creator for common reviews errors returns correct action', () => {
    const expectedAction = {
      type: ActionType.SHOW_REVIEW_POST_ERROR,
      payload: 'Error. Please try later',
    };

    expect(showReviewPostError(400)).toEqual(expectedAction);
  });

  it('action creator for unautorized reviews errors returns correct action', () => {
    const expectedAction = {
      type: ActionType.SHOW_REVIEW_POST_ERROR,
      payload: 'Login to post a comment',
    };

    expect(showReviewPostError(401)).toEqual(expectedAction);
  });
});
