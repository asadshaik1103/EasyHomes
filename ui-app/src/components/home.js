import React from "react";
import { useSelector } from "react-redux";
import authToken from "../utils/authToken";
import { Alert } from '@mui/material';

const Home = () => {
  if (localStorage.jwtToken) {
    authToken(localStorage.jwtToken);
  }

  const auth = useSelector((state) => state.auth);

  return (
    <Alert severity="success">
      <AlertTitle>Success</AlertTitle>
      Welcome {auth.username}
    </Alert>
  );
};

export default Home;