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

export const changeCity = (city) => ({
  type: ActionType.CHANGE_CITY,
  payload: city,
});

export const changeSortType = (sortType) => ({
  type: ActionType.CHANGE_SORT_TYPE,
  payload: sortType,
});

export const loadOffers = (offers) => ({
  type: ActionType.LOAD_OFFERS,
  payload: offers,
});

export const loadOffersItem = (offer) => ({
  type: ActionType.LOAD_OFFERS_ITEM,
  payload: offer,
});

export const requiredAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});

export const closeSession = () => ({
  type: ActionType.LOGOUT,
});

export const setUserEmail = (email) => ({
  type: ActionType.SET_USER_EMAIL,
  payload: email,
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});

export const loadOffersNearby = (offersNearby) => ({
  type: ActionType.LOAD_OFFERS_NEARBY,
  payload: offersNearby,
});

export const loadReviews = (reviews) => ({
  type: ActionType.LOAD_REVIEWS,
  payload: reviews,
});

export const addReview = (reviews) => ({
  type: ActionType.ADD_REVIEW,
  payload: reviews,
});

export const changeReviewSendingStatus = (isSending) => ({
  type: ActionType.CHANGE_REVIEW_SENDING_STATUS,
  payload: isSending,
});

export const clearReviewError = () => ({
  type: ActionType.CLEAR_REVIEW_ERROR,
});

export const showReviewPostError = (error) => {
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
};

export const fetchOffersNearbyError = () => ({
  Type: ActionType.FETCH_OFFERS_NEARBY_ERROR,
});

export const fetchReviewsError = () => ({
  Type: ActionType.FETCH_REVIEWS_ERROR,
});

export const loginError = () => ({
  Type: ActionType.LOGIN_ERROR,
});
