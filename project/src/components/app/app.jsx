import React from 'react';
import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRoute } from '../../const';
import Main from '../main/main';
import Offer from '../offer/offer';
import Favorites from '../favorites/favorites';
import SignIn from '../sign-in/sign-in';
import NotFound from '../not-found/not-found';
import LoadingScreen from '../loading-screen/loading-screen';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../browser-history';
import { getOffersIsLoaded } from '../../store/offers/selectors';


function App() {
  const offersIsLoaded = useSelector(getOffersIsLoaded);
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

export default App;
