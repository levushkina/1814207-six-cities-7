import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../header/header';
import FavoriteLocation from '../favorite-location/favorite-location';
import { sortedPlacesByCity } from '../../utils';
import { getOffers } from '../../store/offers/selectors';


function Favorites() {
  const offers = useSelector(getOffers);
  const favoritesPlaces = offers.filter((place) => place.isFavorite);
  const placesGroupByCity = sortedPlacesByCity(favoritesPlaces);
  const cities = Object.keys(placesGroupByCity);

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.map((city, i) => <FavoriteLocation key={city} city={city} places={placesGroupByCity[city]}/>)}
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

export default Favorites;
