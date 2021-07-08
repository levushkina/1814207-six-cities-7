import { NameSpace } from '../root-reducer';


export const getOffers = (state) => state[NameSpace.OFFER].offers;
export const getOffersIsLoaded = (state) => state[NameSpace.OFFER].offersIsLoaded;
export const getOffersNearby = (state) => state[NameSpace.OFFER].offersNearby;
export const getOffersNearbyIsLoaded = (state) => state[NameSpace.OFFER].offersNearbyIsLoaded;
export const getFavorites = (state) => state[NameSpace.OFFER].favorites;
export const getFavoritesIsLoaded = (state) => state[NameSpace.OFFER].favoritesIsLoaded;
