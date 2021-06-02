import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';


const Settings = {
  PLACES: [
    {
      name: 'Beautiful &amp; luxurious apartment at great location',
      type: 'Apartment',
      rating: '80%',
      mark: 'Premium',
      price: 120,
      imageUrl: 'img/apartment-01.jpg',
    },
    {
      name: 'Wood and stone place',
      type: 'Private room',
      rating: '80%',
      price: 80,
      imageUrl: 'img/room.jpg',
    },
    {
      name: 'Canal View Prinsengracht',
      type: 'Apartment',
      rating: '80%',
      price: 132,
      imageUrl: 'img/apartment-02.jpg',
    },
    {
      name: 'Nice, cozy, warm big bed apartment',
      type: 'Apartment',
      rating: '100%',
      price: 180,
      imageUrl: 'img/apartment-03.jpg',
      mark: 'Premium',
    },
    {
      name: 'Wood and stone place',
      type: 'Private room',
      rating: '80%',
      price: 132,
      imageUrl: 'img/room.jpg',
    },
  ],
  PLACES_COUNT: 312,
};


ReactDOM.render(
  <React.StrictMode>
    <App places={Settings.PLACES} placesCount={Settings.PLACES_COUNT}/>
  </React.StrictMode>,
  document.getElementById('root'));
