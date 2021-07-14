import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import { ActionType } from './action';
import {
  fetchOffersList,
  fetchOffersNearby,
  fetchOffersReviews,
  checkAuth,
  login,
  logout,
  postReview,
  addToFavorites,
  fetchFavorites
} from './api-actions';
import { APIRoute, AppRoute, AuthorizationStatus, ReviewsPostError } from '../const';


let api = null;

describe('Async operations', () => {
  beforeAll(() => {
    api = createAPI(() => {});
  });

  it('should make a correct API call to GET /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(200, {email: 'test@mail.ru'});

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: {
            status: AuthorizationStatus.AUTH,
            email: 'test@mail.ru',
          },
        });

      });
  });

  it('should make a correct API call to POST /login success', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: 'test@mail.ru', password: '123456'};
    const loginLoader = login(fakeUser);

    Storage.prototype.setItem = jest.fn();

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, {token: 'newtoken'});

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(Storage.prototype.setItem).toBeCalledTimes(1);
        expect(Storage.prototype.setItem).nthCalledWith(1, 'token', 'newtoken');
      })
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: {status: AuthorizationStatus.AUTH},
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.MAIN,
        });
      });
  });

  it('should make a correct API call to POST /login error', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: 'test@mail.ru', password: '123456'};
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(400, [{fake: true}]);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOGIN_ERROR,
        });
      });
  });

  it('should make a correct API call to DELETE /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    Storage.prototype.removeItem = jest.fn();

    apiMock
      .onDelete(APIRoute.LOGOUT)
      .reply(204, [{fake: true}]);

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOGOUT,
        });

        expect(Storage.prototype.removeItem).toBeCalledTimes(1);
        expect(Storage.prototype.removeItem).nthCalledWith(1, 'token');
      });
  });

  it('should make a correct API call to GET /hotels', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkOffersLoader = fetchOffersList();

    apiMock
      .onGet(APIRoute.OFFERS)
      .reply(200, [{fake: true}]);

    return checkOffersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: [{fake: true}]
        });
      });
  });

  it('should make a correct API call to GET /comments success', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = fetchOffersReviews(1);

    apiMock
      .onGet(`${APIRoute.REVIEWS}/1`)
      .reply(200, [{fake: true}]);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: [{fake: true}],
        });

      });
  });

  it('should make a correct API call to GET /comments error', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = fetchOffersReviews(1);

    apiMock
      .onGet(`${APIRoute.REVIEWS}/1`)
      .reply(400, [{fake: true}]);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.FETCH_REVIEWS_ERROR,
        });
      });
  });

  it('should make a correct API call to GET /nearby success', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersNearbyLoader = fetchOffersNearby(1);

    apiMock
      .onGet(`${APIRoute.OFFERS}/1${APIRoute.NEARBY}`)
      .reply(200, [{fake: true}]);

    return offersNearbyLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS_NEARBY,
          payload: [{fake: true}]
        });
      });
  });

  it('should make a correct API call to GET /nearby error', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersNearbyLoader = fetchOffersNearby(1);

    apiMock
      .onGet(`${APIRoute.OFFERS}/1${APIRoute.NEARBY}`)
      .reply(404, [{fake: true}]);

    return offersNearbyLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.FETCH_OFFERS_NEARBY_ERROR,
        });
      });
  });

  it('should make a correct API call to POST /comments success', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeReview = {
      comment: 'A quiet cozy and picturesque.',
      rating: 4
    };
    const reviewLoader = postReview(1, fakeReview);

    apiMock
      .onPost(`${APIRoute.REVIEWS}/1`)
      .reply(200, [{fake: true}]);

    return reviewLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.ADD_REVIEW,
          payload: [{fake: true}],
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_REVIEW_SENDING_STATUS,
          payload: false,
        });
      });
  });

  it('should make a correct API call to POST /comments error 400', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeReview = {
      comment: 'A quiet cozy and picturesque.',
      rating: 4
    };
    const reviewLoader = postReview(1, fakeReview);

    apiMock
      .onPost(`${APIRoute.REVIEWS}/1`)
      .reply(400, [{fake: true}]);

    return reviewLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SHOW_REVIEW_POST_ERROR,
          payload: ReviewsPostError.COMMON_ERROR,
        });
      });
  });

  it('should make a correct API call to POST /comments error 401', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeReview = {
      comment: 'A quiet cozy and picturesque.',
      rating: 4
    };
    const reviewLoader = postReview(1, fakeReview);

    apiMock
      .onPost(`${APIRoute.REVIEWS}/1`)
      .reply(401, [{fake: true}]);

    return reviewLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SHOW_REVIEW_POST_ERROR,
          payload: ReviewsPostError.UNAUTORIZED,
        });
      });
  });

  it('should make a correct API call to POST /favorite success', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritesLoader = addToFavorites(1, 1);

    apiMock
      .onPost(`${APIRoute.FAVORITE}/1/1`)
      .reply(200, [{fake: true}]);

    return favoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_OFFER,
          payload: [{fake: true}],
        });
      });
  });

  it('should make a correct API call to POST /favorite error', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritesLoader = addToFavorites(1, 1);

    apiMock
      .onPost(`${APIRoute.FAVORITE}/1/1`)
      .reply(401, [{fake: true}]);

    return favoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.SIGN_IN,
        });
      });
  });

  it('should make a correct API call to GET /favorite success', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritesLoader = fetchFavorites();

    apiMock
      .onGet(APIRoute.FAVORITE)
      .reply(200, [{fake: true}]);

    return favoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITES,
          payload: [{fake: true}],
        });
      });
  });

  it('should make a correct API call to GET /favorite error', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritesLoader = fetchFavorites();

    apiMock
      .onGet(APIRoute.FAVORITE)
      .reply(401, [{fake: true}]);

    return favoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.SIGN_IN,
        });
      });
  });
});
