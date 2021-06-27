import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ActionCreator } from '../../store/action';
import PropTypes from 'prop-types';
import PlacesList from '../places-list/places-list';
import Header from '../header/header';
import offerProp from '../offer/offer.prop';
import Map from '../map/map';
import CitiestList from '../cities-list/cities-list';
import SortingForm from '../sorting-form/sorting-form';
import { CITIES } from '../../const';
import { sortOffers, filterOfferByCity } from '../../utils';


function Main({offers, city, onCityChange, onSortTypeChange, sortType}) {
  const sortedOffers = sortOffers(sortType, filterOfferByCity(city, offers));
  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiestList cities={CITIES} currentCity={city} onCityChange={onCityChange}/>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{sortedOffers.length} places to stay in {city}</b>
              <SortingForm onSortTypeChange={onSortTypeChange} sortType={sortType}/>
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

const mapStateToProps = (state) => ({
  city: state.city,
  offers: state.offers,
  sortType: state.sortType,
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(city) {
    dispatch(ActionCreator.changeCity(city));
  },
  onSortTypeChange(sortType) {
    dispatch(ActionCreator.changeSortType(sortType));
  },
});

Main.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  city: PropTypes.string.isRequired,
  onCityChange: PropTypes.func.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
};

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
