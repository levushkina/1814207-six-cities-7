import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoadingScreen from '../loading-screen/loading-screen';
import Header from '../header/header';
import Footer from '../footer/footer';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import FavoriteLocation from '../favorite-location/favorite-location';
import { sortPlacesByCity, getOffersByIds } from '../../utils';
import { AuthorizationStatus, AppRoute } from '../../const';
import { getFavorites, getFavoritesIsLoaded, getOffers } from '../../store/offers/selectors';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { fetchFavorites } from '../../store/api-actions';


function Favorites() {
  const status = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();
  const offers = useSelector(getOffers);
  const favoritesItemIsLoaded = useSelector(getFavoritesIsLoaded);
  const favoritesPlacesIds = useSelector(getFavorites);
  const placesGroupByCity = sortPlacesByCity(getOffersByIds(offers, favoritesPlacesIds));
  const cities = Object.keys(placesGroupByCity);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [offers, dispatch]);

  if (status !== AuthorizationStatus.AUTH) {
    return (
      <Redirect to={AppRoute.SIGN_IN} />
    );
  }

  if (!favoritesItemIsLoaded) {
    return (
      <LoadingScreen/>
    );
  }

  if (cities.length < 1) {
    return (
      <FavoritesEmpty />
    );
  }

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.map((city) => <FavoriteLocation key={city} city={city} places={placesGroupByCity[city]}/>)}
            </ul>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Favorites;
