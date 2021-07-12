import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { requiredAuthorization } from './store/action';
import { createAPI } from './services/api';
import { fetchOffersList, checkAuth } from './store/api-actions';
import App from './components/app/app';
import rootReducer from './store/root-reducer';
import { AuthorizationStatus } from './const';
import { redirect } from './store/middlewares/redirect';
import browserHistory from './browser-history';


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createAPI(() => store.dispatch(requiredAuthorization({status: AuthorizationStatus.NO_AUTH, email: ''}))),
      },
    }).concat(redirect),
});

store.dispatch(fetchOffersList());
store.dispatch(checkAuth());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
