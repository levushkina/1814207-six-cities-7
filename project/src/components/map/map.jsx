import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import offerProp from '../offer/offer.prop';
import useMap from '../../hooks/use-map';
import useMapMarkers from '../../hooks/use-map-markers';

function Map({places, activeCardId}) {
  const mapRef = useRef(null);
  const city = places.length > 0 ? places[0].city.location : '';

  const map = useMap(mapRef, city);

  useMapMarkers(map, places, activeCardId);

  useEffect(() => {
    if (map) {
      map.setView([city.latitude, city.longitude]);
    }
  }, [places]);

  return (
    <div
      id="map"
      style={{height: '100%'}}
      ref={mapRef}
    />
  );
}

const mapStateToProps = (state) => ({
  activeCardId: state.activeCardId,
});

Map.propTypes = {
  places: PropTypes.arrayOf(offerProp).isRequired,
  activeCardId: PropTypes.number.isRequired,
};

export {Map};
export default connect(mapStateToProps, null)(Map);
