import { useSearchParams } from 'react-router-dom';

export function useUrlPosition() {
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

  return [lat, lng];
}
