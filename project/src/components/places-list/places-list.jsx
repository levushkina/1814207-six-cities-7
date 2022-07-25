import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import offerProp from '../offer/offer.prop';
import { PlacesListType, PlacesListClassName } from '../../const';


function PlacesList({places, type = PlacesListType.MAIN, setActiveCard = () => {}}) {

  const onPlaceMouseOver = useCallback((id) => {
    setActiveCard(id);
  }, [setActiveCard]);

  return (
    <div className={`places__list tabs__content ${PlacesListClassName[type]}`}>
      {places.map((place) => (
        <PlaceCard key={place.id}
          place={place}
          onPlaceMouseOver={onPlaceMouseOver}
          type={type}
        />
      ))}
    </div>
  );
}

PlacesList.propTypes = {
  places: PropTypes.arrayOf(offerProp).isRequired,
  type: PropTypes.string,
  setActiveCard: PropTypes.func,
};

export default PlacesList;
