import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { FILTER_PROPERTY, FILTER_SERVICE, GET_PROPERTY, GET_SERVICE } from '../../../constants/Api';
export const authenticateUserData = createAsyncThunk(
  'app/login',
  async (payload) => {
    console.log('arg1 test: ', payload.email, payload.password);
    const response = await axios
      .post('http://localhost:8080/user/authenticate',  {
        email: payload.email,
        password: payload.password,
      },
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      })

    return response.data;
  }
);

export const filterProperties = createAsyncThunk(
  'app/filter-properties',
  async (payload) => {
    const response = await axios
      .post(FILTER_PROPERTY,  {
        ...payload.filterParams
      },
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      })

    return response.data;
  }
);

export const filterServices = createAsyncThunk(
  'app/filter-services',
  async (payload) => {
    const response = await axios
      .post(FILTER_SERVICE,  {
        ...payload.filterParams
      },
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      })

    return response.data;
  }
);

export const getProperties = createAsyncThunk(
  'app/get-properties',
  async () => {
    const response = await axios
    .get(GET_PROPERTY);

    return response.data;
  }
);


export const getServices = createAsyncThunk(
  'app/get-services',
  async () => {
    const response = await axios
    .get(GET_SERVICE);

    return response.data;
  }
);
