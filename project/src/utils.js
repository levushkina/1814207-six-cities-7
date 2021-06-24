import { MAX_RATING } from './const';

export const convertRatingToPercent = (placeRating) => `${placeRating / MAX_RATING * 100}%`;

export const convertSnekeToCamelCase = (data) => JSON.parse(JSON.stringify(data).replace(
  /(_\w)\w+":/g, (match) => match[1].toUpperCase() + match.substring(2),
));


export const sortedPlacesByCity = (places) => {
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
