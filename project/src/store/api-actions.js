import {
  addReview,
  showReviewPostError,
  changeReviewSendingStatus,
  loadOffers,
  redirectToRoute,
  loadOffersNearby,
  fetchOffersNearbyError,
  loadReviews,
  fetchReviewsError,
  requiredAuthorization,
  loginError,
  closeSession,
  updateOffer,
  loadFavorites
} from './action';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';
import { convertSnekeToCamelCase } from '../utils';

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({data}) => dispatch(loadOffers(convertSnekeToCamelCase(data))))
);

export const fetchOffersNearby = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.OFFERS}/${id}${APIRoute.NEARBY}`)
    .then(({data}) => dispatch(loadOffersNearby(data)))
    .catch(() => dispatch(fetchOffersNearbyError()))
);

export const fetchOffersReviews = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.REVIEWS}/${id}`)
    .then(({data}) => dispatch(loadReviews(convertSnekeToCamelCase(data))))
    .catch(() => dispatch(fetchReviewsError()))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(requiredAuthorization({
        status:  AuthorizationStatus.AUTH,
        email: data.email,
      }));
    })
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => localStorage.setItem('token', data.token))
    .then(() => dispatch(requiredAuthorization({status: AuthorizationStatus.AUTH, email: email})))
    .then(() => dispatch(redirectToRoute(AppRoute.MAIN)))
    .catch(() => dispatch(loginError()))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(APIRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(closeSession()))
);

export const postReview = (id, comment) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.REVIEWS}/${id}`, comment)
    .then(({data}) => dispatch(addReview(convertSnekeToCamelCase(data))))
    .then(() => dispatch(changeReviewSendingStatus(false)))
    .catch((error) => {
      error.response && dispatch(showReviewPostError(error.response.status));
    })
);

export const addToFavorites = (id, status) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.FAVORITE}/${id}/${status}`)
    .then(({data}) => dispatch(updateOffer(convertSnekeToCamelCase(data))))
    .catch(() => dispatch(redirectToRoute(AppRoute.SIGN_IN)))
);

export const fetchFavorites = () => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FAVORITE}`)
    .then(({data}) => dispatch(loadFavorites(data)))
    .catch(() => dispatch(redirectToRoute(AppRoute.SIGN_IN)))
);
