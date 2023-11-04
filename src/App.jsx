import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './components/fake-auth-context/FakeAuthContext';
import ProtectedRoute from './pages/protected-route/ProtectedRoute';
import { Suspense, lazy } from 'react';

import CityList from './components/city/CityList';
import CountryList from './components/country/CountryList';
import City from './components/city/City';
import Form from './components/form/Form';
import SpinnerFullPage from './components/spinner/SpinnerFullPage';

/* import Homepage from './pages/home page/Homepage';
import Product from './pages/product/Product';
import Pricing from './pages/pricing/Pricing';
import Login from '../src/pages/login/Login';
import AppLayout from './pages/app layout/AppLayout';
import PageNotFound from './pages/error/PageNotFound'; */

const Homepage = lazy(() => import('./pages/home page/Homepage'));
const Product = lazy(() => import('./pages/product/Product'));
const Pricing = lazy(() => import('./pages/pricing/Pricing'));
const Login = lazy(() => import('../src/pages/login/Login'));
const AppLayout = lazy(() => import('./pages/app layout/AppLayout'));
const PageNotFound = lazy(() => import('./pages/error/PageNotFound'));

// 1) Add `AuthProvider` to `App.jsx`

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path='/product' element={<Product />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='login' element={<Login />} />
              <Route
                path='app'
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to='cities' />} />
                <Route path='cities' element={<CityList />} />
                <Route path='cities/:id' element={<City />} />

                <Route path='countries' element={<CountryList />} />
                <Route path='form' element={<Form />} />
              </Route>
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
