import { ActionType } from './action';
import { DEFAULT_CITY, sortOption, AuthorizationStatus } from '../const';
import { convertSnekeToCamelCase } from '../utils';


const initialState = {
  city: DEFAULT_CITY,
  offers: [],
  offersIsLoaded: false,
  sortType: sortOption.DEFAULT,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  userEmail: '',
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
    default:
      return state;
  }
};

export {reduser};
