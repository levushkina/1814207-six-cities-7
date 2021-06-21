import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import offerProp from '../offer/offer.prop';
import {PlasesListType, PlasesListClassName} from '../../const';


function PlacesList(props) {
  const {places, type} = props;
  const [currentPlace, setCurrentPlace] = useState(null);

  const handlePlaceMouseOver = (id) => {
    setCurrentPlace(id);
  };

  const plasesListClassName = type === PlasesListType.NEAR ? PlasesListClassName.NEAR : PlasesListClassName.MAIN;

  return (
    <div className={`places__list tabs__content ${plasesListClassName}`}>
      {places.map((place, i) => (
        <PlaceCard key={place.id}
          place={place}
          onPlaceMouseOver = {() => handlePlaceMouseOver(place.id)}
          currentPlace={currentPlace}
          type={type}
        />
      ))}
    </div>
  );
}

PlacesList.propTypes = {
  places: PropTypes.arrayOf(offerProp).isRequired,
  type: PropTypes.string.isRequired,
};

export default PlacesList;
