import React from 'react';
import PropTypes from 'prop-types';
import City from '../city/city';

function CitiestList({currentCity, cities, onCityChange}) {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <City
            key={city}
            city={city}
            currentCity={currentCity}
            onCityChange={onCityChange}
          />
        ))}
      </ul>
    </section>
  );
}

CitiestList.propTypes = {
  cities: PropTypes.array.isRequired,
  currentCity: PropTypes.string.isRequired,
  onCityChange: PropTypes.func.isRequired,
};

export default CitiestList;
