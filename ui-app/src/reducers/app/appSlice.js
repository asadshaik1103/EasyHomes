import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isUserLoggedIn: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateUserLoggedInStatus: (state, action) => {
            state.isUserLoggedIn = action.payload.isUserLoggedIn;
        }
    },
});

export const { updateUserLoggedInStatus } = appSlice.actions;
export default appSlice.reducer;
