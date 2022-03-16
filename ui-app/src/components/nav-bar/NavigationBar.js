import React from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useDispatch, useSelector } from "react-redux";

import {Link} from 'react-router-dom'
import { logoutUser } from "../../services/index";


const NavigationBar = () => {

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  const guestLinks = (
    <>
      <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                      <Toolbar>
                        <IconButton
                          size="large"
                          edge="start"
                          color="inherit"
                          aria-label="menu"
                          sx={{ mr: 2 }}
                        >
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                          Easy Homes
                        </Typography>
                        <Link to={"register"}>
                          <Button color="inherit">
                               Register
                          </Button>
                        </Link>
                        <Link to={"login"} >
                          <Button color="inherit">
                              Login
                          </Button>
                        </Link>
                      </Toolbar>
                    </AppBar>
                  </Box>
    </>
  );
  const userLinks = (
    <>
       <Box sx={{ flexGrow: 1 }}>
                          <AppBar position="static">
                            <Toolbar>
                              <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                              >
                              </IconButton>
                              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Easy Homes
                              </Typography>
                              <Link to={"logout"} onClick={logout}>
                               <Button color="inherit">
                                 Logout
                               </Button>
                              </Link>
                            </Toolbar>
                          </AppBar>
                        </Box>
    </>
  );

    return (
         <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Easy Homes
                  </Typography>
                    <Link to={"register"}>
                                              <Button color="inherit">
                                                   Register
                                              </Button>
                                            </Link>
                                            <Link to={"login"} >
                                              <Button color="inherit">
                                                  Login
                                              </Button>
                                            </Link>
                </Toolbar>
              </AppBar>
            </Box>
    );
}

export default NavigationBar;
