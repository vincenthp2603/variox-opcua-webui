import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './slices/mainslice';

let store = configureStore({
    reducer: mainReducer
})

export default store;