import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, loadOffersNearby, fetchOffersNearbyError, updateOffer, loadFavorites } from '../action';
import { replaceOffer } from '../../utils';


const initialState = {
  offers: [],
  offersIsLoaded: false,
  offerItemIsLoaded: false,
  offersNearby: [],
  offersNearbyIsLoaded: false,
  favorites: [],
  favoritesIsLoaded: false,
};

const offers = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.offersIsLoaded = true;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = action.payload.map((offer) => offer.id);
      state.offersNearbyIsLoaded = true;
    })
    .addCase(fetchOffersNearbyError, (state, action) => {
      state.offersNearby = [];
      state.offersNearbyIsLoaded = false;
    })
    .addCase(updateOffer, (state, action) => {
      state.offers = replaceOffer(state.offers, action.payload);
    })
    .addCase(loadFavorites, (state, action) => {
      state.favorites = action.payload.map((offer) => offer.id);
      state.favoritesIsLoaded = true;
    });
});

export { offers };
