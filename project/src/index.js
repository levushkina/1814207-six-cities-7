import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import offers from './mocks/offers';
import {convertSnekeToCamelCase} from './utils';


const PLACES_COUNT = 312;

ReactDOM.render(
  <React.StrictMode>
    <App places={convertSnekeToCamelCase(offers)} placesCount={PLACES_COUNT}/>
  </React.StrictMode>,
  document.getElementById('root'));
