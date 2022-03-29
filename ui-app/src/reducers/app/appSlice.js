import { createSlice } from "@reduxjs/toolkit";
import { authenticateUserData } from "./thunks/appThunks";

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
    authenticateUser: (state, action) => {
      state.isUserLoggedIn = action.payload.isUserLoggedIn;
    },
  },{
  extraReducers: (builder) => {
    builder.addCase(authenticateUserData.pending, (state) => {
      console.log("pending", state);
    });
    builder.addCase(authenticateUserData.fulfilled, (state, { payload }) => {
      if (payload.token) {
        state.isUserLoggedIn = true;
        state.token = payload.token;
        localStorage.setItem("token", payload.token);
      }
    });
    builder.addCase(authenticateUserData.rejected, (state, { payload }) => {
      console.log("rejected: ", payload);
      console.log("rejected");
    });
  },
});

export const { updateUserLoggedInStatus,openModel, openModelProperty,authenticateUser  } = appSlice.actions;
export default appSlice.reducer;
