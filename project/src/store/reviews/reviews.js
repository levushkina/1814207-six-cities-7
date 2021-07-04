import { ActionType } from '../action';
import { convertSnekeToCamelCase } from '../../utils';


const initialState = {
  reviews: [],
  reviewsIsLoaded: false,
  reviewIsSending: false,
  reviewError: '',
};

const reviews = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_REVIEWS:
      return {
        ...state,
        reviews: convertSnekeToCamelCase(action.payload),
        reviewsIsLoaded: true,
      };
    case ActionType.FETCH_REVIEWS_ERROR:
      return {
        ...state,
        reviews: [],
        reviewsIsLoaded: false,
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


    default:
      return state;
  }
};

export { reviews };
