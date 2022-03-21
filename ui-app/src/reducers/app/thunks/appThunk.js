import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
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
