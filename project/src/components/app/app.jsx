import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
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


function App({reviews, offersIsLoaded}) {
  if (!offersIsLoaded) {
    return (
      <LoadingScreen/>
    );
  }

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
          <Favorites/>;
        </Route>
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

const mapStateToProps = (state) => ({
  offersIsLoaded: state.offersIsLoaded,
});

App.propTypes = {
  reviews: PropTypes.arrayOf(reviewsItemProp).isRequired,
  offersIsLoaded: PropTypes.bool.isRequired,
};

export {App};
export default connect(mapStateToProps, null)(App);
