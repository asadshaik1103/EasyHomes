import React, { Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Container from '@mui/material/Container';

import './App.css';
import { updateUserLoggedInStatus } from './reducers/app/appSlice';
import Login from './components/login/Login';
import NavBar from './components/nav-bar/Navbar';
import HomeTabs from './components/home-tabs/HomeTabs';
import FabMenu from './components/fab-menu/FabMenu';
// const NavBar = lazy(() => import('./components/nav-bar/Navbar'));

function App() {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(state => state.app.isUserLoggedIn);


  setTimeout(() => { // TODO setTimeout is used just to mock auto login behaviour
    dispatch(updateUserLoggedInStatus({ isUserLoggedIn: true }))
  }, 3000);

  return (
    <>
    {/* TODO add protected route and lazy load'Home' component after login functionality is completed */}
      <Suspense fallback={<small>Loading...</small>}>
        <Routes>
            <Route path="/" element={isUserLoggedIn ? 
              <>
                <NavBar />
                <Container>
                  <HomeTabs />
                  <FabMenu />
                </Container>
              </> :
              <Login />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
