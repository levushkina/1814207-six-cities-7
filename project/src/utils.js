import { MAX_RATING, sortOption, AuthorizationStatus, ReviewsTextLimit } from './const';


export const convertRatingToPercent = (placeRating) => `${Math.round(placeRating) / MAX_RATING * 100}%`;

export const convertSnekeToCamelCase = (data) => JSON.parse(JSON.stringify(data).replace(
  /(_\w)\w+":/g, (match) => match[1].toUpperCase() + match.substring(2),
));


export const sortPlacesByCity = (places) => {
  const placesGroupByCity = {};

  places.forEach((place) => {
    const cityName = place.city.name;

    if (placesGroupByCity[cityName]) {
      placesGroupByCity[cityName].push(place);
    } else {
      placesGroupByCity[cityName] = [place];
    }
  });
  return placesGroupByCity;
};

export const convertDate = (date) => new Date(date).toLocaleString('en-GB', {month: 'long', year: 'numeric'});

export const filterOfferByCity = (city, offers) => offers.filter((offer) => offer.city.name === city);

export const sortOffers = (type, offers) => {
  switch (type) {
    case sortOption.PRICE_LOW:
      return offers.sort((a, b) => a.price - b.price);
    case sortOption.PRICE_HIGH:
      return offers.sort((a, b) => b.price - a.price);
    case sortOption.RATING:
      return offers.sort((a, b) => b.rating - a.rating);
    default: return offers.sort((a, b) => a.id - b.id);
  }
};

export const isCheckedAuth = (authorizationStatus) =>
  authorizationStatus === AuthorizationStatus.UNKNOWN;

export const getOffersByIds = (offers, ids) => ids.map((id) => (
  offers.find((offer) => offer.id === id)
));

export const formValidate = (reviewRating, reviewText) => (
  reviewRating > 0 && ReviewsTextLimit.MAX >= reviewText.length && reviewText.length >= ReviewsTextLimit.MIN
);

export const sortReviewsByDate = (reviews) => reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
