import React, { useState, lazy, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';


import './App.css';
import { updateUserLoggedInStatus } from './reducers/app/appSlice';
import NavBar from './components/nav-bar/Navbar';
import HomeTabs from './components/home-tabs/HomeTabs';
import FabMenu from './components/fab-menu/FabMenu';

import NavigationBar from './components/nav-bar/NavigationBar';
import Welcome from './components/nav-bar/Welcome';
import Login from './User/Login';
import Register from './User/Register';
// const NavBar = lazy(() => import('./components/nav-bar/Navbar'));



function App() {
//  const dispatch = useDispatch();

//  const [token, setToken] = useState();

//  const isUserLoggedIn = useSelector(state => state.app.isUserLoggedIn);

//    if(!token) {
//        return <Login setToken={setToken} />
//      }

//  setTimeout(() => { // TODO setTimeout is used just to mock auto login behaviour
//    dispatch(updateUserLoggedInStatus({ isUserLoggedIn: true }))
//  }, 3000);

  const heading = "Welcome to EasyHomes";
  const footer = "Group-24";

  return (

      <>
        <NavigationBar/>
        <Container>
            <Grid>
               <Routes>
                        <Route path="/" element={() => <Welcome heading={heading} footer={footer} /> } />
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
               </Routes>
            </Grid>
        </Container>
        </>

//    <>
//    {/* TODO add protected route and lazy load'Home' component after login functionality is completed */}
//      <Suspense fallback={<small>Loading...</small>}>
//        <Routes>
//        <>
//                <Route path="/" element={isUserLoggedIn ?
//                                                   <>
//                                                     <NavBar />
//                                                     <Container>
//                                                       <HomeTabs />
//                                                       <FabMenu />
//                                                     </Container>
//                                                   </> :
//
//                         <Login />} />
//                       />
//        </>
//        </Routes>
//      </Suspense>
//    </>
  );
}


export default App;

