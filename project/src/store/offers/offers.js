import { ActionType } from '../action';
import { DEFAULT_CITY, sortOption } from '../../const';
import { convertSnekeToCamelCase } from '../../utils';


const initialState = {
  city: DEFAULT_CITY,
  sortType: sortOption.DEFAULT,
  offers: [],
  offersIsLoaded: false,
  offerItem: {},
  offerItemIsLoaded: false,
  offersNearby: [],
  offersNearbyIsLoaded: false,
};

const offers = (state = initialState, action) => {
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
    case ActionType.FETCH_OFFERS_NEARBY_ERROR:
      return {
        ...state,
        offersNearby: [],
        offersNearbyIsLoaded: false,
      };
    default:
      return state;
  }
};

export { offers };
