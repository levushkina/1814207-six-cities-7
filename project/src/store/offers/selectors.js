import { NameSpace } from '../root-reducer';


export const getCity = (state) => state[NameSpace.OFFER].city;
export const getSortType = (state) => state[NameSpace.OFFER].sortType;
export const getOffers = (state) => state[NameSpace.OFFER].offers;
export const getOffersIsLoaded = (state) => state[NameSpace.OFFER].offersIsLoaded;
export const getOfferItem = (state) => state[NameSpace.OFFER].offerItem;
export const getOfferItemIsLoaded = (state) => state[NameSpace.OFFER].offerItemIsLoaded;
export const getOffersNearby = (state) => state[NameSpace.OFFER].offersNearby;
export const getOffersNearbyIsLoaded = (state) => state[NameSpace.OFFER].offersNearbyIsLoaded;
