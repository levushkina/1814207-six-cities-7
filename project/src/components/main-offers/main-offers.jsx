import React, { useState } from 'react';
import PropTypes from 'prop-types';
import offerProp from '../offer/offer.prop';
import PlacesList from '../places-list/places-list';
import Map from '../map/map';
import SortingForm from '../sorting-form/sorting-form';


function MainOffers({offers, currentCity, handleSortTypeChange, sortType}) {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {currentCity}</b>
        <SortingForm onSortTypeChange={handleSortTypeChange} sortType={sortType}/>
        <PlacesList places={offers} setActiveCard={setActiveCard}/>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map places={offers} activeCardId={activeCard}/>
        </section>
      </div>
    </div>
  );
}

MainOffers.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  currentCity: PropTypes.string.isRequired,
  handleSortTypeChange: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
};

export default MainOffers;
