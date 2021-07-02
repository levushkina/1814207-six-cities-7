import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import offerProp from '../offer/offer.prop';
import { PlacesListType, PlacesListClassName } from '../../const';


function PlacesList({places, type = PlacesListType.MAIN, setActiveCard}) {

  const handlePlaceMouseOver = (id) => {
    setActiveCard(id);
  };

  return (
    <div className={`places__list tabs__content ${PlacesListClassName[type]}`}>
      {places.map((place, i) => (
        <PlaceCard key={place.id}
          place={place}
          onPlaceMouseOver = {() => handlePlaceMouseOver(place.id)}
          type={type}
        />
      ))}
    </div>
  );
}

PlacesList.propTypes = {
  places: PropTypes.arrayOf(offerProp).isRequired,
  type: PropTypes.string,
  setActiveCard: PropTypes.func.isRequired,
};

export default PlacesList;
