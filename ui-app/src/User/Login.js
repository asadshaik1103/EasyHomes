import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { authenticateUserData } from "../reducers/app/thunks/appThunks";
import Alert from "@mui/material/Alert";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authenticateUser } from '../reducers/app/appSlice';
// /reducers/app/appSlice

// react should call an login API 
// this response should give jwttoken

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        EasyHomes
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [initialState, setInitialState] = useState({
    email: "",
    password: "",
    error: "",
  });

  const isUserLoggedIn = useSelector((state) => state.app.isUserLoggedIn);
  if (isUserLoggedIn) {
    navigate("/dashboard");
  }

  const credentialsChange = (event) => {
    setInitialState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value, // TODO test whether it is working or not
    }));
  };

  const validateUser = (event) => {
    if (event) {
      event.preventDefault();
    }
    dispatch(authenticateUserData({ email, password }));
  };

  const { email, password, error } = initialState;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {error && <Alert severity="error">{error}</Alert>}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onChange={credentialsChange}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateUser}
              sx={{ mt: 3, mb: 2 }}
              disabled={
                initialState.email.length === 0 ||
                initialState.password.length === 0
              }
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                          Forgot password?
                        </Link> */}
              </Grid>
              <Grid item>
                 <Link href="register" variant="body2">
                          {"Don't have an account? Sign Up"}
                 </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
