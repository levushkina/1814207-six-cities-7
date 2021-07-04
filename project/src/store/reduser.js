import { ActionType } from './action';
import { DEFAULT_CITY, sortOption, AuthorizationStatus } from '../const';
import { convertSnekeToCamelCase } from '../utils';


const initialState = {
  city: DEFAULT_CITY,
  offers: [],
  offersIsLoaded: false,
  offerItem: {},
  offerItemIsLoaded: false,
  sortType: sortOption.DEFAULT,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  userEmail: '',
  offersNearby: [],
  offersNearbyIsLoaded: false,
  reviews: [],
  reviewsIsLoaded: false,
  reviewIsSending: false,
  reviewError: '',
};

const reduser = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case ActionType.CHANGE_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload,
      };
    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: convertSnekeToCamelCase(action.payload),
        offersIsLoaded: true,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: '',
      };
    case ActionType.SET_USER_EMAIL:
      return {
        ...state,
        userEmail: action.payload,
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.LOAD_OFFERS_ITEM:
      return {
        ...state,
        offerItem: convertSnekeToCamelCase(action.payload),
        offerItemIsLoaded: true,
      };
    case ActionType.LOAD_OFFERS_NEARBY:
      return {
        ...state,
        offersNearby: convertSnekeToCamelCase(action.payload),
        offersNearbyIsLoaded: true,
      };
    case ActionType.LOAD_OFFERS_REVIEWS:
      return {
        ...state,
        reviews: convertSnekeToCamelCase(action.payload),
        reviewsIsLoaded: true,
      };
    case ActionType.POST_REVIEW:
      return {
        ...state,
        reviews: convertSnekeToCamelCase(action.payload),
      };
    case ActionType.CHANGE_REVIEW_SENDING_STATUS:
      return {
        ...state,
        reviewIsSending: action.payload,
      };
    case ActionType.SHOW_REVIEW_POST_ERROR:
      return {
        ...state,
        reviewError: action.payload,
      };
    case ActionType.CLEAR_REVIEW_ERROR:
      return {
        ...state,
        reviewError: '',
      };
    case ActionType.FETCH_OFFERS_NEARBY_ERROR:
      return {
        ...state,
        offersNearby: [],
        offersNearbyIsLoaded: false,
      };
    case ActionType.FETCH_OFFERS_REVIEWS_ERROR:
      return {
        ...state,
        reviews: [],
        reviewsIsLoaded: false,
      };
    case ActionType.LOGIN_ERROR:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: '',
      };
    default:
      return state;
  }
};

export {reduser};
