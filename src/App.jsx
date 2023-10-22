import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './pages/product/Product';
import Pricing from './pages/pricing/Pricing';
import Homepage from './pages/home page/Homepage';
import PageNotFound from './pages/error/PageNotFound';
import Login from '../src/pages/login/Login';
import AppLayout from './pages/app layout/AppLayout';
import CityList from './components/city/CityList';
import { useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:8000';

function App() {
  const [cities, setCities] = useState({});
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    async function fetchCitites() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert('There was an error loading data...');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCitites();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='/product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='login' element={<Login />} />
        <Route path='app' element={<AppLayout />}>
          <Route index element={<h1>LIST</h1>} />
          <Route path='cities' element={<CityList />} />
          <Route path='countries' element={<p>Counties</p>} />
          <Route path='form' element={<p>Form</p>} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
