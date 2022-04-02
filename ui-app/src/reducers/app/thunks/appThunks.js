import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AUTH_USER } from '../../../constants/Api';
export const authenticateUserData = createAsyncThunk(
  'app/login',
  async (payload) => {
    console.log('arg1 test: ', payload.email, payload.password);
    const response = await axios
      .post(AUTH_USER,  {
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