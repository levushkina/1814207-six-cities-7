import React from 'react';
import { connect } from 'react-redux';
import { ActionCreator } from '../../store/action';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import offerProp from '../offer/offer.prop';
import { PlacesListType, PlacesListClassName } from '../../const';


function PlacesList({places, type = PlacesListType.MAIN, onChangeActiveCard}) {
  const handlePlaceMouseOver = (id) => {
    onChangeActiveCard(id);
  };

  return (
    <div className={`places__list tabs__content ${PlacesListClassName[type]}`}>
      {places.map((place, i) => (
        <PlaceCard key={place.id}
          place={place}
          onPlaceMouseOver = {() => handlePlaceMouseOver(place.id)}
          type={type}
        />
      ))}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onChangeActiveCard(id) {
    dispatch(ActionCreator.changeActiveCard(id));
  },
});

PlacesList.propTypes = {
  places: PropTypes.arrayOf(offerProp).isRequired,
  type: PropTypes.string,
  onChangeActiveCard: PropTypes.func.isRequired,
};

export { PlacesList };
export default connect(null, mapDispatchToProps)(PlacesList);
