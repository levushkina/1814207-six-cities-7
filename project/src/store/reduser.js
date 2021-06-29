import { ActionType } from './action';
import offers from '../mocks/offers';
import { DEFAULT_CITY } from '../const';
import { convertSnekeToCamelCase, filterOfferByCity } from '../utils';

const formatedOffers = convertSnekeToCamelCase(offers);

const initialState = {
  city: DEFAULT_CITY,
  offers: formatedOffers,
  filteredOffers: filterOfferByCity(DEFAULT_CITY, formatedOffers),
};

const reduser = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case ActionType.GET_OFFERS_BY_CITY:
      return {
        ...state,
        filteredOffers: filterOfferByCity(action.payload, state.offers),
      };
    default:
      return state;
  }
};

export {reduser};
