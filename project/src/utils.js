const convertRatingToPercent = (placeRating) => {
  const MAX_RATING = 5;
  return `${placeRating / MAX_RATING * 100}%`;
};

export default convertRatingToPercent;
