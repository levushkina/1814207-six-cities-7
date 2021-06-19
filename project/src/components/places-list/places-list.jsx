import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import offerProp from '../offer/offer.prop';

function PlacesList(props) {
  const {places} = props;
  const [currentPlace, setCurrentPlace] = useState(null);

  const handlePlaceMouseOver = (id) => {
    setCurrentPlace(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {places.map((place, i) => <PlaceCard key={place.id} place={place} onPlaceMouseOver = {() => handlePlaceMouseOver(place.id)} currentPlace={currentPlace} />)}
    </div>
  );
}

PlacesList.propTypes = {
  places: PropTypes.arrayOf(offerProp).isRequired,
};

export default PlacesList;
