import React, { useState } from 'react';
import styles from './map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useCities } from '../../contexts/CitiesContext';

const Map = () => {
  /** useSearchParams HOOK
   * useSearch param is a hook given by the react router
   * it is similar to useState hook
   * it returns an array which has the current state, second is to set param
   *
   * next to store or get lat and lng which is in url we use:
   * the get method on this searchParam object and use the name of the variable
   */
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

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

  // map position
  const [mapPosition, setMapPosition] = useState([40, 0]);

  // cities
  const { cities } = useCities();
  console.log(cities);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
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
      </MapContainer>
    </div>
  );
};

export default Map;
