import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Product from './pages/product/Product';
import Pricing from './pages/pricing/Pricing';
import Homepage from './pages/home page/Homepage';
import PageNotFound from './pages/error/PageNotFound';
import Login from '../src/pages/login/Login';
import AppLayout from './pages/app layout/AppLayout';
import CityList from './components/city/CityList';
import CountryList from './components/country/CountryList';
import City from './components/city/City';
import Form from './components/form/Form';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './components/fake-auth-context/FakeAuthContext';

// 1) Add `AuthProvider` to `App.jsx`

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path='/product' element={<Product />} />
            <Route path='pricing' element={<Pricing />} />
            <Route path='login' element={<Login />} />
            <Route path='app' element={<AppLayout />}>
              <Route index element={<Navigate replace to='cities' />} />
              <Route path='cities' element={<CityList />} />
              <Route path='cities/:id' element={<City />} />

              <Route path='countries' element={<CountryList />} />
              <Route path='form' element={<Form />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
