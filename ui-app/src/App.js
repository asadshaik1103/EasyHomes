import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Routes, Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import { updatePageState } from './reducers/app/appSlice';
import HomePage from './Pages/HomePage';

import Login from './Components/login/Login';
import NavBar from './Components/nav-bar/Navbar';
// import Drawer from './components/nav-bar/drawer/Drawer'

// const NavBar = lazy(() => import('./components/nav-bar/Navbar'));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updatePageState({ pageLoaded: 1 }));
  })
  const isUserLoggedIn = true;
  return (
    <>
      <NavBar />
    </>
  );
}

export default App;
