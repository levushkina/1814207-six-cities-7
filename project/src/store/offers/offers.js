import {createReducer} from '@reduxjs/toolkit';
import { changeCity, loadOffers, changeSortType, loadOffersItem, loadOffersNearby, fetchOffersNearbyError } from '../action';
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

const offers = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = convertSnekeToCamelCase(action.payload);
      state.offersIsLoaded = true;
    })
    .addCase(loadOffersItem, (state, action) => {
      state.offerItem = convertSnekeToCamelCase(action.payload);
      state.offerItemIsLoaded = true;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = convertSnekeToCamelCase(action.payload);
      state.offersNearbyIsLoaded = true;
    })
    .addCase(fetchOffersNearbyError, (state, action) => {
      state.offersNearby = [];
      state.offersNearbyIsLoaded = false;
    });
});

export { offers };
