import { createAction } from '@reduxjs/toolkit';
import { errorCode, ReviewsPostError } from '../const';

export const ActionType = {
  LOAD_OFFERS: 'loadOffers',
  REQUIRED_AUTHORIZATION: 'requiredAuthorization',
  LOGOUT: 'logout',
  REDIRECT_TO_ROUTE: 'redirectToRoute',
  LOAD_OFFERS_NEARBY: 'loadOffersNearby',
  LOAD_REVIEWS: 'loadReviews',
  ADD_REVIEW: 'addReview',
  CHANGE_REVIEW_SENDING_STATUS: 'changeReviewSendingStatus',
  SHOW_REVIEW_POST_ERROR: 'showReviewPostError',
  FETCH_OFFERS_NEARBY_ERROR: 'fetchOffersNearbyError',
  FETCH_REVIEWS_ERROR: 'fetchReviewsError',
  LOGIN_ERROR: 'loginError',
  UPDATE_OFFER: 'updateOffer',
  LOAD_FAVORITES: 'loadFavorites',
};

export const loadOffers = createAction(ActionType.LOAD_OFFERS, (offers) => ({
  payload: offers,
}));

export const requiredAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => ({
  payload: status,
}));

export const closeSession = createAction(ActionType.LOGOUT);

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => ({
  payload: url,
}));

export const loadOffersNearby = createAction(ActionType.LOAD_OFFERS_NEARBY, (offersNearby) => ({
  payload: offersNearby,
}));

export const loadReviews = createAction(ActionType.LOAD_REVIEWS, (reviews) => ({
  payload: reviews,
}));

export const addReview = createAction(ActionType.ADD_REVIEW, (reviews) => ({
  payload: reviews,
}));

export const changeReviewSendingStatus = createAction(ActionType.CHANGE_REVIEW_SENDING_STATUS, (isSending) => ({
  payload: isSending,
}));

export const showReviewPostError = createAction(ActionType.SHOW_REVIEW_POST_ERROR, (error) => {
  let errorText;

  switch (error) {
    case errorCode.UNAUTORIZED_ERROR_CODE:
      errorText = ReviewsPostError.UNAUTORIZED;
      break;
    default:
      errorText = ReviewsPostError.COMMON_ERROR;
  }
  return {
    type: ActionType.SHOW_REVIEW_POST_ERROR,
    payload: errorText,
  };
});

export const fetchOffersNearbyError = createAction(ActionType.FETCH_OFFERS_NEARBY_ERROR);

export const fetchReviewsError = createAction(ActionType.FETCH_REVIEWS_ERROR);

export const loginError = createAction(ActionType.LOGIN_ERROR);

export const updateOffer = createAction(ActionType.UPDATE_OFFER, (offer) => ({
  payload: offer,
}));

export const loadFavorites = createAction(ActionType.LOAD_FAVORITES, (favoritesOffers) => ({
  payload: favoritesOffers,
}));
