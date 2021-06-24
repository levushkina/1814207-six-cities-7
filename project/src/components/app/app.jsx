import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import PropTypes from 'prop-types';
import Main from '../main/main';
import Offer from '../offer/offer';
import Favorites from '../favorites/favorites';
import SignIn from '../sign-in/sign-in';
import NotFound from '../not-found/not-found';
import offerProp from '../offer/offer.prop';
import reviewsItemProp from '../reviews-item/reviews-item.prop';


function App(props) {
  const {places, reviews} = props;

  const favoritesPlaces = places.filter((place) => place.isFavorite);
  const getPlacesNear = () => places.slice(0, 3);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <Main/>;
        </Route>
        <Route exact path={AppRoute.SIGN_IN}>
          <SignIn/>;
        </Route>
        <Route exact path={AppRoute.FAVORITES}>
          <Favorites places={favoritesPlaces}/>;
        </Route>
        <Route exact path={AppRoute.OFFER}>
          <Offer reviews={reviews} nearPlaces={getPlacesNear()}/>;
        </Route>
        <Route>
          <NotFound/>;
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  places: PropTypes.arrayOf(offerProp).isRequired,
  reviews: PropTypes.arrayOf(reviewsItemProp).isRequired,
};

export default App;
