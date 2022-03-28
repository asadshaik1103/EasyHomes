import { createSlice } from '@reduxjs/toolkit';
import { authenticateUserData } from './thunks/appThunk';

const initialState = {
  isUserLoggedIn: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateUserLoggedInStatus: (state, action) => {
            state.isUserLoggedIn = action.payload.isUserLoggedIn;
        },
        authenticateUser: (state, action) => {
            state.isUserLoggedIn = action.payload.isUserLoggedIn;
        },
        logoutUser: (state, action) => {
            localStorage.removeItem("token");
            state.isUserLoggedIn = action.payload.isUserLoggedIn;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authenticateUserData.pending, (state) => {
            console.log('pending', state);
        });
        builder.addCase(authenticateUserData.fulfilled, (state, { payload }) => {
            if (payload.token) {
                state.isUserLoggedIn = true;
                state.token = payload.token;
                localStorage.setItem('token', payload.token);
            }
        });
        builder.addCase(authenticateUserData.rejected, (state, { payload }) => {
            console.log('rejected: ', payload);
            console.log('rejected');
        });
    },
});

export const { updateUserLoggedInStatus, authenticateUser, logoutUser } = appSlice.actions;
export default appSlice.reducer;
