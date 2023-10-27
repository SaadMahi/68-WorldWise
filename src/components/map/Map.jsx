import React, { useEffect, useState } from 'react';
import styles from './map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useCities } from '../../contexts/CitiesContext';
import { useGeolocation } from '../../hooks/useGeoLocation';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import Button from '../button/Button';

const Map = () => {
  const [mapLat, mapLng] = useUrlPosition();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  // map position
  const [mapPosition, setMapPosition] = useState([40, 0]);

  // cities
  const { cities } = useCities();
  // //console.log(cities);

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLat]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type='position' onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'use your position'}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        // center={[mapLat, mapLng]}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  /** useNavigate HOOK, USED FOR PROGRAMMATIC NAVIGATION
   * given by react-router dom
   * it returns a function called navigate
   * we can use this function to basically move to any url
   * we can set in anywhere on form submit btn or a map page
   * and if user clicks we can send user to the desired url we want
   * in other words we can display the desired component
   *
   * here we have set i in a condition that when user clicks the map section
   * form component will get displayed on the left side, means user will go to form url
   *
   * ! this method is known as programmatic navigation
   * * because it allows us to move to the form without us to having to click on any link
   *
   * ! other methods we use to navigate pages by clicking links are know as DECLARATIVE WAY
   */
  const navigate = useNavigate();

  // useMap event from leaf let library
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`), console.log(e);
    },
  });
}

export default Map;
