import { useState, useCallback } from 'react';
import { DEFAULT_CITY, sortOption } from '../const';
import { sortOffers, filterOfferByCity } from '../utils';

function useSordedOffers(offers) {
  const [currentCity, setCurrentCity] = useState(DEFAULT_CITY);
  const [sortType, setSortType] = useState(sortOption.DEFAULT);
  const sortedOffers = sortOffers(sortType, filterOfferByCity(currentCity, offers));

  const handleCurrentCityChange = useCallback((cityName) => {
    setCurrentCity(cityName);
  }, []);

  const handleSortTypeChange = useCallback((type) => {
    setSortType(type);
  }, []);

  return [currentCity, handleCurrentCityChange, sortType, handleSortTypeChange, sortedOffers];
}

export default useSordedOffers;
