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
  LOAD_OFFERS_REVIEWS: 'loadOffersReviews',
  POST_REVIEW: 'postReview',
  CHANGE_REVIEW_SENDING_STATUS: 'changeReviewSendingStatus',
  SHOW_REVIEW_POST_ERROR: 'showReviewPostError',
  CLEAR_REVIEW_ERROR: 'clearReviewError',
  FETCH_OFFERS_NEARBY_ERROR: 'fetchOffersNearbyError',
  FETCH_OFFERS_REVIEWS_ERROR: 'fetchOffersReviewsError',
  LOGIN_ERROR: 'loginError',
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  changeSortType: (sortType) => ({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: sortType,
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
  loadOffersItem: (offer) => ({
    type: ActionType.LOAD_OFFERS_ITEM,
    payload: offer,
  }),
  requiredAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
  setUserEmail: (email) => ({
    type: ActionType.SET_USER_EMAIL,
    payload: email,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
  loadOffersNearby: (offersNearby) => ({
    type: ActionType.LOAD_OFFERS_NEARBY,
    payload: offersNearby,
  }),
  loadOffersReviews: (reviews) => ({
    type: ActionType.LOAD_OFFERS_REVIEWS,
    payload: reviews,
  }),
  postReview: (reviews) => ({
    type: ActionType.POST_REVIEW,
    payload: reviews,
  }),
  changeReviewSendingStatus: (isSending) => ({
    type: ActionType.CHANGE_REVIEW_SENDING_STATUS,
    payload: isSending,
  }),
  clearReviewError: () => ({
    type: ActionType.CLEAR_REVIEW_ERROR,
  }),
  showReviewPostError: (error) => {
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
  },
  fetchOffersNearbyError: () => ({
    Type: ActionType.FETCH_OFFERS_NEARBY_ERROR,
  }),
  fetchOffersReviewsError: () => ({
    Type: ActionType.FETCH_OFFERS_REVIEWS_ERROR,
  }),
  loginError: () => ({
    Type: ActionType.LOGIN_ERROR,
  }),
};
