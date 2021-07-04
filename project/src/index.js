import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { requiredAuthorization } from './store/action';
import thunk from 'redux-thunk';
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

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

store.dispatch(fetchOffersList());
store.dispatch(checkAuth());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
