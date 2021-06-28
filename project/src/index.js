import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ActionCreator } from './store/action';
import thunk from 'redux-thunk';
import { createAPI } from './services/api';
import { fetchOffersList, checkAuth } from './store/api-actions';
import App from './components/app/app';
import reviews from './mocks/reviews';
import { convertSnekeToCamelCase } from './utils';
import { reduser } from './store/reduser';
import { AuthorizationStatus } from './const';
import { redirect } from './store/middlewares/redirect';


const api = createAPI(
  // error 'store' was used before it was defined
  // eslint-disable-next-line
  () => store.dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH)),
);

const store = createStore(
  reduser,
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
      <App reviews={convertSnekeToCamelCase(reviews)}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
