import React from 'react';
import PropTypes from 'prop-types';

function City({city, currentCity, onCityChange}) {
  const handleCityClick = (evt) => {
    evt.preventDefault();
    onCityChange(city);
  };

  return (
    <li className="locations__item">
      <a
        className={`locations__item-link tabs__item ${currentCity === city && 'tabs__item--active '}`}
        href="#"
        onClick={handleCityClick}
      >
        <span>{city}</span>
      </a>
    </li>
  );
}

City.propTypes = {
  city: PropTypes.string.isRequired,
  currentCity: PropTypes.string.isRequired,
  onCityChange: PropTypes.func.isRequired,
};

export default City;
