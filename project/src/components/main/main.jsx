import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PlacesList from '../places-list/places-list';
import Header from '../header/header';
import Map from '../map/map';
import CitiestList from '../cities-list/cities-list';
import SortingForm from '../sorting-form/sorting-form';
import { CITIES } from '../../const';
import useSordedOffers from '../../hooks/use-sorded-offers';
import { getOffers } from '../../store/offers/selectors';


function Main() {
  const offers = useSelector(getOffers);
  const [currentCity, handleCurrentCityChange, sortType, handleSortTypeChange, sortedOffers] = useSordedOffers(offers);
  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiestList cities={CITIES} currentCity={currentCity} onCityChange={handleCurrentCityChange}/>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{sortedOffers.length} places to stay in {currentCity}</b>
              <SortingForm onSortTypeChange={handleSortTypeChange} sortType={sortType}/>
              <PlacesList places={sortedOffers} setActiveCard={setActiveCard}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map places={sortedOffers} activeCardId={activeCard}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
