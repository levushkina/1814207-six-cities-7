import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import offerProp from '../offer/offer.prop';

import useMap from '../../hooks/use-map';
import useMapMarkers from '../../hooks/use-map-markers';

function Map(props) {
  const {places} = props;
  const mapRef = useRef(null);
  const city = places.length > 0 ? places[0].city.location : '';

  const map = useMap(mapRef, city);

  useMapMarkers(map, places);

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

Map.propTypes = {
  places: PropTypes.arrayOf(offerProp).isRequired,
};

export default Map;
