import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, loadOffersItem, loadOffersNearby, fetchOffersNearbyError } from '../action';


const initialState = {
  offers: [],
  offersIsLoaded: false,
  offerItem: {},
  offerItemIsLoaded: false,
  offersNearby: [],
  offersNearbyIsLoaded: false,
};

const offers = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.offersIsLoaded = true;
    })
    .addCase(loadOffersItem, (state, action) => {
      state.offerItem = action.payload;
      state.offerItemIsLoaded = true;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
      state.offersNearbyIsLoaded = true;
    })
    .addCase(fetchOffersNearbyError, (state, action) => {
      state.offersNearby = [];
      state.offersNearbyIsLoaded = false;
    });
});

export { offers };
