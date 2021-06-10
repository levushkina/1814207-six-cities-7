import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import FavoriteLocation from '../favorite-location/favorite-location';
import offerProp from '../offer/offer.prop';


function Favorites(props) {
  const {places} = props;

  const cities = [...new Set(places.map((place) => place.city.name))];

  const _placesGroupByCity = cities.map((city) => ({
    name: city,
    places: places.filter((place) => place.city.name === city),
  }));

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {_placesGroupByCity.map((city, i) => <FavoriteLocation key={city.name} city={city} />)}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}


Favorites.propTypes = {
  places: PropTypes.arrayOf(offerProp).isRequired,
};

export default Favorites;
