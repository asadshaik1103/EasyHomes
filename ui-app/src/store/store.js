import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../reducers/app/appSlice';

export default configureStore({
    reducer: {
        app: appReducer
    }
});
