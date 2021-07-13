import { addReview, clearReviewError, showReviewPostError, changeReviewSendingStatus, loadOffers, loadOffersItem, redirectToRoute, loadOffersNearby, fetchOffersNearbyError, loadReviews, fetchReviewsError, requiredAuthorization, setUserEmail, loginError, closeSession } from './action';
import { APIRoute, AuthorizationStatus, AppRoute, errorCode } from '../const';
import { convertSnekeToCamelCase } from '../utils';

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({data}) => dispatch(loadOffers(convertSnekeToCamelCase(data))))
);

export const fetchOffersItem = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.OFFERS}/${id}`)
    .then(({data}) => dispatch(loadOffersItem(convertSnekeToCamelCase(data))))
    .catch((error) => {
      error.response.status === errorCode.NOT_FOUND && dispatch(redirectToRoute(AppRoute.NOT_FOUND));
    })
);

export const fetchOffersNearby = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.OFFERS}/${id}${APIRoute.NEARBY}`)
    .then(({data}) => dispatch(loadOffersNearby(convertSnekeToCamelCase(data))))
    .catch(() => {
      dispatch(fetchOffersNearbyError());
    })
);

export const fetchOffersReviews = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.REVIEWS}/${id}`)
    .then(({data}) => dispatch(loadReviews(convertSnekeToCamelCase(data))))
    .catch(() => {
      dispatch(fetchReviewsError());
    })
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(requiredAuthorization(AuthorizationStatus.AUTH));
      dispatch(setUserEmail(data.email));
    })
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => localStorage.setItem('token', data.token))
    .then(() => dispatch(requiredAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(setUserEmail(email)))
    .then(() => dispatch(redirectToRoute(AppRoute.MAIN)))
    .catch(() => {
      dispatch(loginError());
    })
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(APIRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(closeSession()))
);

export const postReview = (id, data) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.REVIEWS}/${id}`, data)
    .then(({reviews}) => dispatch(addReview(convertSnekeToCamelCase(reviews))))
    .then(() => {
      dispatch(changeReviewSendingStatus(false));
      dispatch(clearReviewError());
    })
    .catch((error) => {
      error.response && dispatch(showReviewPostError(error.response.status));
    })
);
