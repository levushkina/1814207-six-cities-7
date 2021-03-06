import React from 'react';
import { useSelector } from 'react-redux';
import MainEmpty from '../main-empty/main-empty';
import MainOffers from '../main-offers/main-offers';
import Header from '../header/header';
import CitiestList from '../cities-list/cities-list';
import { CITIES } from '../../const';
import { useSortedOffers } from '../../hooks/use-sorted-offers';
import { getOffers } from '../../store/offers/selectors';


function Main() {
  const offers = useSelector(getOffers);
  const [currentCity, handleCurrentCityChange, sortType, handleSortTypeChange, sortedOffers] = useSortedOffers(offers);
  const citiesBlock = () => (
    offers.length > 0 ?
      <MainOffers offers={sortedOffers} currentCity={currentCity} onSortTypeChange={handleSortTypeChange} sortType={sortType}/> :
      <MainEmpty/>
  );

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiestList cities={CITIES} currentCity={currentCity} onCityChange={handleCurrentCityChange}/>
        </div>
        <div className="cities">
          {citiesBlock()}
        </div>
      </main>
    </div>
  );
}

export default Main;
