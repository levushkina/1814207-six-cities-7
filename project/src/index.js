import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createAPI } from './services/api';
import { fetchOffersList } from './store/api-actions';
import App from './components/app/app';
import reviews from './mocks/reviews';
import { convertSnekeToCamelCase } from './utils';
import { reduser } from './store/reduser';


const api = createAPI();

const store = createStore(
  reduser,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

store.dispatch(fetchOffersList());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={convertSnekeToCamelCase(reviews)}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
