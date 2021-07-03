import { ActionType } from './action';
import offers from '../mocks/offers';
import { DEFAULT_CITY, sortOption } from '../const';
import { convertSnekeToCamelCase } from '../utils';

const formatedOffers = convertSnekeToCamelCase(offers);

const initialState = {
  city: DEFAULT_CITY,
  offers: formatedOffers,
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
    default:
      return state;
  }
};

export {reduser};
