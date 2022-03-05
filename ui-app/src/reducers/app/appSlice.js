import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // TODO this flag is just to be used as a reference 
    // to understand RTK and should be removed later 
    pageLoaded: 0
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updatePageState: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.pageLoaded = action.payload.pageLoaded;
        }
    },
});

// Action creators are generated for each case reducer function
export const { updatePageState } = appSlice.actions;
export default appSlice.reducer;
