import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import offerProp from '../offer/offer.prop';
import {PlacesListType, PlacesListClassName} from '../../const';


function PlacesList(props) {
  const {places, type = PlacesListType.MAIN} = props;
  const [currentPlace, setCurrentPlace] = useState(null);

  const handlePlaceMouseOver = (id) => {
    setCurrentPlace(id);
  };

  return (
    <div className={`places__list tabs__content ${PlacesListClassName[type]}`}>
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
