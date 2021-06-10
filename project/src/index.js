import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import offers from './mocks/offers';


const PLACES_COUNT = 312;

ReactDOM.render(
  <React.StrictMode>
    <App places={offers} placesCount={PLACES_COUNT}/>
  </React.StrictMode>,
  document.getElementById('root'));
