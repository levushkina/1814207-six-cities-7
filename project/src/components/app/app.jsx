import React from 'react';
import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppRoute } from '../../const';
import PropTypes from 'prop-types';
import Main from '../main/main';
import Offer from '../offer/offer';
import Favorites from '../favorites/favorites';
import SignIn from '../sign-in/sign-in';
import NotFound from '../not-found/not-found';
import LoadingScreen from '../loading-screen/loading-screen';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../browser-history';
import { getOffersIsLoaded } from '../../store/offers/selectors';
import { getAuthorizationStatus } from '../../store/user/selectors';


function App({offersIsLoaded, authorizationStatus}) {
  if (!offersIsLoaded) {
    return (
      <BrowserRouter history={browserHistory}>
        <LoadingScreen/>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <Main/>;
        </Route>
        <Route exact path={AppRoute.SIGN_IN}>
          <SignIn/>;
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={() => <Favorites />}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.OFFER}>
          <Offer/>;
        </Route>
        <Route>
          <NotFound/>;
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  offersIsLoaded: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  offersIsLoaded: getOffersIsLoaded(state),
  authorizationStatus: getAuthorizationStatus(state),
});

export {App};
export default connect(mapStateToProps, null)(App);
