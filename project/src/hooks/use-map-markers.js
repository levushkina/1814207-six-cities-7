import { useEffect, useState } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {URL_MARKER_DEFAULT} from '../const';

function useMapMarker(map, places) {
  const [markers, setMarkers] = useState({});
  const mapMarkers = [];

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
  });

  useEffect(() => {
    if (map) {
      if (markers.mapMarkers) {
        markers.mapMarkers.forEach((marker) => map.removeLayer(marker));
      }

      places.forEach(({location, id}) => {
        const marker = leaflet
          .marker(
            [location.latitude, location.longitude],
            {icon: defaultCustomIcon},
          )
          .addTo(map);
        mapMarkers.push(marker);
      });

      setMarkers({
        mapMarkers,
      });
    }
  }, [map, places]);
}

export default useMapMarker;
