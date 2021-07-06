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
import reviewsItemProp from '../reviews-item/reviews-item.prop';
import LoadingScreen from '../loading-screen/loading-screen';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../browser-history';


function App({reviews, offersIsLoaded, authorizationStatus}) {
  if (!offersIsLoaded) {
    return (
      <LoadingScreen/>
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
          <Offer reviews={reviews}/>;
        </Route>
        <Route>
          <NotFound/>;
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  reviews: PropTypes.arrayOf(reviewsItemProp).isRequired,
  offersIsLoaded: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  offersIsLoaded: state.offersIsLoaded,
  authorizationStatus: state.authorizationStatus,
});

export {App};
export default connect(mapStateToProps, null)(App);
