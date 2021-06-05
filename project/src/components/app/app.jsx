import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import PropTypes from 'prop-types';
import Main from '../main/main';
import Room from '../room/room';
import Favorites from '../favorites/favorites';
import SignIn from '../sign-in/sign-in';
import NotFound from '../not-found/not-found';


function App(props) {
  const {places, placesCount} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <Main places={places} placesCount={placesCount}/>;
        </Route>
        <Route exact path={AppRoute.SIGN_IN}>
          <SignIn/>;
        </Route>
        <Route exact path={AppRoute.FSVORITES}>
          <Favorites/>;
        </Route>
        <Route exact path={AppRoute.DEV_ROOM}>
          <Room/>;
        </Route>
        <Route>
          <NotFound/>;
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  places: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      rating: PropTypes.string,
      mark: PropTypes.string,
      price: PropTypes.string,
      imageUrl: PropTypes.string,
    }),
  ).isRequired,
  placesCount: PropTypes.number.isRequired,
};

export default App;
