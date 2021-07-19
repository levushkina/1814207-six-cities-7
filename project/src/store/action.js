import { createAction } from '@reduxjs/toolkit';
import { errorCode, ReviewsPostError } from '../const';

export const ActionType = {
  LOAD_OFFERS: 'offer/loadOffers',
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  LOGOUT: 'user/logout',
  REDIRECT_TO_ROUTE: 'user/redirectToRoute',
  LOAD_OFFERS_NEARBY: 'offer/loadOffersNearby',
  LOAD_REVIEWS: 'review/loadReviews',
  ADD_REVIEW: 'review/addReview',
  CHANGE_REVIEW_SENDING_STATUS: 'review/changeReviewSendingStatus',
  SHOW_REVIEW_POST_ERROR: 'review/showReviewPostError',
  FETCH_OFFERS_NEARBY_ERROR: 'offer/fetchOffersNearbyError',
  FETCH_REVIEWS_ERROR: 'review/fetchReviewsError',
  LOGIN_ERROR: 'user/loginError',
  UPDATE_OFFER: 'offer/updateOffer',
  LOAD_FAVORITES: 'offer/loadFavorites',
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
