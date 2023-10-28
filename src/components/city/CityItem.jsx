import React from 'react';
import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';
import { useCities } from '../../contexts/CitiesContext';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

const CityItem = ({ city }) => {
  // //console.log(city);
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  const handleClick = function (e) {
    e.preventDefault();
    deleteCity(id);
  };

  return (
    <ul>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles['cityItem--active'] : ''
        }`}
        /** QUERY STRING
         * ! now we have both lng and lat in the globally accessible URL if you check
         * * remeber this is a query string
         * in this to= prop we pass in id, lat and lng, this is how we create query string
         */

        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button onClick={handleClick} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </ul>
  );
};

export default CityItem;
