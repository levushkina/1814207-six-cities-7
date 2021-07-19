import { offers } from './offers';
import { loadOffers, loadOffersNearby, fetchOffersNearbyError, updateOffer, loadFavorites, ActionType } from '../action';

const mockOffers = [{
  bedRooms: 3,
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  id: 1,
  isFavorite: false,
  isPremium: false,
  type: 'apartment',
  title: 'Beautiful & luxurious studio at great location',
}];

describe('Reducer: offers', () => {
  it('without additional parameters should return initial state', () => {
    expect(offers(undefined, {}))
      .toEqual({
        offers: [],
        offersIsLoaded: false,
        offersNearby: [],
        offersNearbyIsLoaded: false,
        favorites: [],
        favoritesIsLoaded: false,
      });
  });

  it('should update offers & offersIsLoaded when offers loaded', () => {
    const state = {
      offers: [],
      offersIsLoaded: false,
    };
    const loadOffersAction = {
      type: ActionType.LOAD_OFFERS,
      payload: mockOffers,
    };

    expect(offers(state, loadOffersAction))
      .toEqual({
        offers: mockOffers,
        offersIsLoaded: true,
      });
  });

  it('should update offersNearby & offersNearbyIsLoaded when offersNearby loaded', () => {
    const state = {
      offersNearby: [],
      offersNearbyIsLoaded: false,
    };
    const loadOffersNearbyAction = {
      type: ActionType.LOAD_OFFERS_NEARBY,
      payload: mockOffers,
    };

    expect(offers(state, loadOffersNearbyAction))
      .toEqual({
        offersNearby: [1],
        offersNearbyIsLoaded: true,
      });
  });

  it('should reset offersNearby & offersNearbyIsLoaded when offersNearby loaded with error', () => {
    const state = {
      offersNearby: [],
      offersNearbyIsLoaded: false,
    };
    const fetchOffersNearbyErrorAction = {
      type: ActionType.FETCH_OFFERS_NEARBY_ERROR,
      payload: mockOffers,
    };

    expect(offers(state, fetchOffersNearbyErrorAction))
      .toEqual({
        offersNearby: [],
        offersNearbyIsLoaded: false,
      });
  });

  it('should update offers favorite status', () => {
    const state = {offers: mockOffers};
    const updateOfferAction = {
      type: ActionType.UPDATE_OFFER,
      payload: {
        bedRooms: 3,
        description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
        id: 1,
        isFavorite: true,
        isPremium: false,
        type: 'apartment',
        title: 'Beautiful & luxurious studio at great location',
      },
    };

    expect(offers(state, updateOfferAction))
      .toEqual({
        offers: [
          {
            bedRooms: 3,
            description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
            id: 1,
            isFavorite: true,
            isPremium: false,
            type: 'apartment',
            title: 'Beautiful & luxurious studio at great location',
          }
        ],
      });
  });

  it('should update favorites & favoritesIsLoaded', () => {
    const state = {
      favorites: [],
      favoritesIsLoaded: false,
    };
    const loadFavoritesAction = {
      type: ActionType.LOAD_FAVORITES,
      payload: mockOffers,
    };

    expect(offers(state, loadFavoritesAction))
      .toEqual({
        favorites: [1],
        favoritesIsLoaded: true,
      });
  });
});
