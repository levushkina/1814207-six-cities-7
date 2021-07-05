import { createAction } from '@reduxjs/toolkit';
import { errorCode, ReviewsPostError } from '../const';

export const ActionType = {
  CHANGE_CITY: 'chengeSity',
  CHANGE_SORT_TYPE: 'changeSortType',
  LOAD_OFFERS: 'loadOffers',
  LOAD_OFFERS_ITEM: 'loadOffersItem',
  REQUIRED_AUTHORIZATION: 'requiredAuthorization',
  LOGOUT: 'logout',
  SET_USER_EMAIL: 'setUserEmail',
  REDIRECT_TO_ROUTE: 'redirectToRoute',
  LOAD_OFFERS_NEARBY: 'loadOffersNearby',
  LOAD_REVIEWS: 'loadReviews',
  ADD_REVIEW: 'addReview',
  CHANGE_REVIEW_SENDING_STATUS: 'changeReviewSendingStatus',
  SHOW_REVIEW_POST_ERROR: 'showReviewPostError',
  CLEAR_REVIEW_ERROR: 'clearReviewError',
  FETCH_OFFERS_NEARBY_ERROR: 'fetchOffersNearbyError',
  FETCH_REVIEWS_ERROR: 'fetchReviewsError',
  LOGIN_ERROR: 'loginError',
};

export const changeCity = createAction(ActionType.CHANGE_CITY, (city) => ({
  payload: city,
}));

export const changeSortType = createAction(ActionType.CHANGE_SORT_TYPE, (sortType) => ({
  payload: sortType,
}));

export const loadOffers = createAction(ActionType.LOAD_OFFERS, (offers) => ({
  payload: offers,
}));

export const loadOffersItem = createAction(ActionType.LOAD_OFFERS_ITEM, (offer) => ({
  payload: offer,
}));

export const requiredAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => ({
  payload: status,
}));

export const closeSession = createAction(ActionType.LOGOUT);

export const setUserEmail = createAction(ActionType.SET_USER_EMAIL, (email) => ({
  payload: email,
}));

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

export const clearReviewError = createAction(ActionType.CLEAR_REVIEW_ERROR);

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
