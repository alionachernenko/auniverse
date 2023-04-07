import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes, useLocation } from 'react-router-dom';

import { useEffect, lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import { Header, Footer, LoadingPage, SignupForm, LoginForm } from 'components';
import { ScrollButton } from 'components/ScrollButton/ScrollButton';

const Homepage = lazy(() => import('./pages/Homepage/Homepage'));
const Catalog = lazy(() => import('./pages/Catalog/Catalog'));
const GameDescription = lazy(() =>
  import('./pages/GameDescription/GameDescription')
);
const AuthenticationPage = lazy(() =>
  import('./pages/AuthenticationPage/AuthenticationPage')
);
const AccountPage = lazy(() => import('./pages/AccountPage/AccountPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage'));
const UserProfile = lazy(() => import('./pages/UserProfile/UserProfile'));
const Users = lazy(() => import('./pages/Community/Community'));

export const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scroll({
      top: 0,
    });
  }, [location.pathname]);

  return (
    <>
      <Header />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:gameSlug" element={<GameDescription />} />
          <Route path="/login" element={<AuthenticationPage />}>
            <Route path="login-page" element={<LoginForm />} />
            <Route path="signup-page" element={<SignupForm />} />
          </Route>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id/*" element={<UserProfile />} />
          <Route path="/profile/*" element={<AccountPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
      <Footer />
      <ScrollButton />
      <ToastContainer />
    </>
  );
};
