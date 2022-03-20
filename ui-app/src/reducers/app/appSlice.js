import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isUserLoggedIn: false,
    homeDialog:{
        isOpen:false,
        service:null,
    }
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateUserLoggedInStatus: (state, action) => {
            state.isUserLoggedIn = action.payload.isUserLoggedIn;
        },
        openModel: (state,action) => {
            console.log("fdsahkjfsdhj",action.payload.homeDialog)
            state.homeDialog.isOpen = action.payload.homeDialog.isOpen;
            state.homeDialog.service = action.payload.homeDialog.service;
        }
    },
});

export const { updateUserLoggedInStatus,openModel } = appSlice.actions;
export default appSlice.reducer;
