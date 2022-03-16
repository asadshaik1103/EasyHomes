import * as AT from "./authTypes";
import axios from "axios";

const AUTH_URL = "http://localhost:8080";

export const authenticateUser = (email, password) => async (dispatch) => {
  // dispatch(loginRequest());
  const cred = {
    email: email,
    password: password,
  };

  // try {
    // const response = axios.post(AUTH_URL, {
    //   email: email,
    //   password: password,
    // const res = axios({
    //   method: "post",
    //   url: "http://localhost:8080/user/authenticate",
    //   data: JSON.stringify(cred),
    //   headers:{
    //     'Content-Type':'application/json'
    //   }
    // }).then(function (response) {
    //   console.log("res: ", response);
    // });
  //   localStorage.setItem("jwtToken", res.data.token);
  //   dispatch(success({ username: res.data.name, isLoggedIn: true }));
  //   return Promise.resolve(res.data);
  // } catch (error) {
  //   dispatch(failure());
  //   return Promise.reject(error);
  // }
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
    localStorage.removeItem("jwtToken");
    dispatch(success({ username: "", isLoggedIn: false }));
  };
};

const loginRequest = () => {
  return {
    type: AT.LOGIN_REQUEST,
  };
};

const logoutRequest = () => {
  return {
    type: AT.LOGOUT_REQUEST,
  };
};

const success = (isLoggedIn) => {
  return {
    type: AT.SUCCESS,
    payload: isLoggedIn,
  };
};

const failure = () => {
  return {
    type: AT.FAILURE,
    payload: false,
  };
};
