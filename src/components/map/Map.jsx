import React from 'react';
import styles from './map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

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

  /** useNavigate HOOK
   * given by react-router dom
   * it returns a function called navigate
   * we can use this function to basically move to any url
   * we can set in anywhere on form submit btn or a map page
   * and if user clicks we can send user to the desired url we want
   * in other words we can display the desired component
   *
   * here we have set i in a condition that when user clicks the map section
   * form component will get displayed on the left side, means user will go to form url
   */
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate('form');
      }}
      className={styles.mapContainer}
    >
      <h1>Map</h1>
      <h1>
        Positions: {lat}, {lng}
      </h1>
    </div>
  );
};

export default Map;
