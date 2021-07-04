import { ActionCreator } from './action';
import { APIRoute, AuthorizationStatus, AppRoute, errorCode } from '../const';

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({data}) => dispatch(ActionCreator.loadOffers(data)))
);

export const fetchOffersItem = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.OFFERS}/${id}`)
    .then(({data}) => dispatch(ActionCreator.loadOffersItem(data)))
    .catch((error) => {
      error.response.status === errorCode.NOT_FOUND && dispatch(ActionCreator.redirectToRoute(AppRoute.NOT_FOUND));
    })
);

export const fetchOffersNearby = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.OFFERS}/${id}${APIRoute.NEARBY}`)
    .then(({data}) => dispatch(ActionCreator.loadOffersNearby(data)))
    .catch(() => {
      dispatch(ActionCreator.fetchOffersNearbyError());
    })
);

export const fetchOffersReviews = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.REVIEWS}/${id}`)
    .then(({data}) => dispatch(ActionCreator.loadOffersReviews(data)))
    .catch(() => {
      dispatch(ActionCreator.fetchOffersReviewsError());
    })
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.setUserEmail(data.email));
    })
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => localStorage.setItem('token', data.token))
    .then(() => dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.setUserEmail(email)))
    .then(() => dispatch(ActionCreator.redirectToRoute(AppRoute.MAIN)))
    .catch(() => {
      dispatch(ActionCreator.loginError());
    })
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(APIRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(ActionCreator.logout()))
);

export const postReview = (id, data) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.REVIEWS}/${id}`, data)
    .then(({reviews}) => dispatch(ActionCreator.postReview(reviews)))
    .then(() => {
      dispatch(ActionCreator.changeReviewSendingStatus(false));
      dispatch(ActionCreator.clearReviewError());
    })
    .catch((error) => {
      error.response && dispatch(ActionCreator.showReviewPostError(error.response.status));
    })
);
