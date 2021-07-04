import { ActionType } from '../action';
import { AuthorizationStatus } from '../../const';


const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  userEmail: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.LOGIN_ERROR:
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
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: '',
      };
    default:
      return state;
  }
};

export { user };
