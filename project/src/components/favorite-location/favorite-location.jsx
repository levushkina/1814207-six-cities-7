import React from 'react';
import PropTypes from 'prop-types';
import FavoriteItem from '../favorite-item/favorite-item';
import offerProp from '../offer/offer.prop';

function FavoriteLocation(props) {
  const {city} = props;

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city.name}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {city.places.map((place) => <FavoriteItem key={place.title} place={place} />)}
      </div>
    </li>
  );
}

FavoriteLocation.propTypes = {
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    places: PropTypes.arrayOf(offerProp).isRequired,
  }).isRequired,
};

export default FavoriteLocation;
