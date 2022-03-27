import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isUserLoggedIn: false,
    homeDialog:{
        isOpen:false,
        service:null,
    },
    homeDialogProperty:{
        isOpen:false,
        property:null,
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
            state.homeDialog.isOpen = action.payload.homeDialog.isOpen;
            state.homeDialog.service = action.payload.homeDialog.service;
        },openModelProperty: (state,action) => {
            state.homeDialogProperty.isOpen = action.payload.homeDialogProperty.isOpen;
            state.homeDialogProperty.property = action.payload.homeDialogProperty.property;
        }
    },
});

export const { updateUserLoggedInStatus,openModel, openModelProperty } = appSlice.actions;
export default appSlice.reducer;
