import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { requiredAuthorization } from './store/action';
import { createAPI } from './services/api';
import { fetchOffersList, checkAuth } from './store/api-actions';
import App from './components/app/app';
import rootReducer from './store/root-reducer';
import { AuthorizationStatus } from './const';
import { redirect } from './store/middlewares/redirect';


const api = createAPI(
  // error 'store' was used before it was defined
  // eslint-disable-next-line
  () => store.dispatch(requiredAuthorization(AuthorizationStatus.NO_AUTH)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(fetchOffersList());
store.dispatch(checkAuth());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
