import React, {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import offerProp from '../offer/offer.prop';
import useMap from '../../hooks/use-map';
import {URL_MARKER_DEFAULT} from '../../const';

function Map(props) {
  const {places} = props;
  const mapRef = useRef(null);
  const city = places[0].city.location;
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
  });

  useEffect(() => {
    if (map) {
      places.forEach(({location: {latitude, longitude}}) => {
        leaflet
          .marker({
            lat: latitude,
            lng: longitude,
          }, {
            icon: defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, places]);

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
