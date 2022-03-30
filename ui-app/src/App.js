import React, { useState, lazy, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, BrowserRouter as Router, Navigate, Outlet } from 'react-router-dom';

import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';



import Slide from '@mui/material/Slide';
import './App.css';
import { updateUserLoggedInStatus } from './reducers/app/appSlice';
import NavBar from './components/nav-bar/Navbar';
import HomeTabs from './components/home-tabs/HomeTabs';
import FabMenu from './components/fab-menu/FabMenu';

import Welcome from './components/nav-bar/Welcome';
import Login from './User/Login';
import Register from './User/Register';
import Drawer from './components/nav-bar/drawer/Drawer';
import FilterMenu from './components/filter-menu/FilterMenu';
// const NavBar = lazy(() => import('./components/nav-bar/Navbar'));

import axios from 'axios';
import { IconButton } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

////////video call component ////////
import VideoCallWebRTC from './components/video-call/VideoCallWebRTC';

/////video call component ////////

const isLogin = () => {
  return !!localStorage.getItem("token");
  // return true;
}

const Public = () => <Login />;
const Private = () => <Dashboard />;
// const Login = () => <div>login</div>;

function PrivateOutlet() {
  const auth = isLogin();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

function PublicOutlet() {
  const auth = isLogin();
  return !auth ? <Outlet /> : <Navigate to="/dashboard" />;
}

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}

function useAuth() {
  return true;
}


function App() {
  const heading = "Welcome to EasyHomes";
  const footer = "Group-24";

  useEffect(() => {
    // http://localhost:8080/
    // console.log('App.js: useEffect: isUserLoggedIn: ', isUserLoggedIn);
    axios.get('8080/property/properties')
      .then(res => {
        const persons = res.data;
        console.log('App.js: useEffect: axios.get: success', persons);
        // this.setState({ persons });
      })
  }, []);

  return (
      <Routes>
        <Route path="/dashboard" element={<PrivateOutlet />}>
          <Route path="" element={<Private />} />
        </Route>
        <Route path="login" element={<PublicOutlet />}>
          <Route path="" element={<Public />} />
        </Route>
        <Route path="" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  );
}

const Dashboard = () => {
  const [checked, setChecked] = React.useState(true);
  // const [collapsibleCardWidth, setCollapsibleCardWidth] = React.useState(25);

  const getCollapsibleCardWidth = () => {
    if (checked) {
      return 25 + '%';
    } else {
      return 5 + '%';
    }
  };

  const getContentWidth = () => {
    if (checked) {
      return 75 + '%';
    } else {
      return 95 + '%';
    }
  };

  const filterMenuBar = (
    <FilterMenu 
      setChecked={setChecked}
      checked={checked}
      />
    // </FilterMenu>
  );
  return (
    <>
      <NavBar />
      {/* <HomeTabs />
      <FabMenu /> */}
      <Box sx={{ width: '100%', height: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'no-wrap',
        justifyContent: 'space-around' }}>
        <Box sx={{ width: getCollapsibleCardWidth(),
          '& .MuiCollapse-wrapperInner': {
            width: '100%',
          }
        }}>
          <Collapse orientation="horizontal" in={checked} collapsedSize={50}>
            {filterMenuBar}
          </Collapse>
          {/* <FilterMenu /> */}
          {/* <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
            {icon}
          </Slide> */}
        </Box>
        <Box sx={{ width: getContentWidth() }}>
          <Box>
            <HomeTabs />
            <FabMenu />
          </Box>
        </Box>
      </Box>
      {/* <Container>
        <FilterMenu />
      </Container>
      <Box>
          <HomeTabs />
          <FabMenu />
      </Box> */}
    </>
  );
};


export default App;
