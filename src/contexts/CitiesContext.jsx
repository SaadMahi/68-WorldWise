import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

/** REDUCER ALONG WITH API'S
 * problem with useReducer is here that
 * reducers needs to be pure functions
 * which means that we cannot do api requests inside the reducer function
 * so what we can do is make fetch requests in separate functions
 * and then after the data has been already received then we can dispatch actions
 * to the reducer, so when asynchronous data and asynchromous code involved,
 * then we don't get that nice benefit where we can simply pass dispatch function
 * into the context value
 */

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

/** NAMING CONVENTION
 * when we use useReducer in a bit larger application
 * it's important to follow meaningfull naming conventions
 * when it comes to action types
 * it's usually a good idea to model these as events but not a setters
 * as it makes it easier to see all the related transitions
 * for example it shouldn't be 'setCities' rather 'cities/loaded'
 * it is a good naming convention in thee redux community
 * so using / makes it easy to understand it is related to cities and it has been loaded
 * So always name them as events not as setter as it is easier to know it by event
 */

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };

    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error('Unknown action type');
  }
}

const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCitites() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch {
        dispatch({
          type: 'reject',
          payload: 'There was an error loading cities...',
        });
      }
    }
    fetchCitites();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch {
      dispatch({
        type: 'reject',
        payload: 'There was an error loading city...',
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({ type: 'city/created', payload: data });
      // setCurrentCity(data);
    } catch {
      dispatch({
        type: 'reject',
        payload: 'There was an error creating the city...',
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: 'city/deleted', payload: id });

      // setCurrentCity(data);
    } catch {
      dispatch({
        type: 'reject',
        payload: 'There was an error deleting the city...',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error('CitiesContext was used outside the CitiesProvider');
  }
  return context;
}

export { CitiesProvider, useCities };
