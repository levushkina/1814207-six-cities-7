import React from 'react';
import PropTypes from 'prop-types';
import MainScreen from '../main-screen/main-screen';


function App(props) {
  const {places, placesCount} = props;

  return <MainScreen places={places} placesCount={placesCount}/>;
}

App.propTypes = {
  places: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      rating: PropTypes.string,
      mark: PropTypes.string,
      price: PropTypes.string,
      imageUrl: PropTypes.string,
    }),
  ).isRequired,
  placesCount: PropTypes.number.isRequired,
};

export default App;
