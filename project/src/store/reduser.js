import { ActionType } from './action';
import { DEFAULT_CITY, sortOption } from '../const';
import { convertSnekeToCamelCase } from '../utils';


const initialState = {
  city: DEFAULT_CITY,
  offers: [],
  offersIsLoaded: false,
  sortType: sortOption.DEFAULT,
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
    default:
      return state;
  }
};

export {reduser};
