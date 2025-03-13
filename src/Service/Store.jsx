import { configureStore } from '@reduxjs/toolkit';
import { API } from './API';

export const Store = configureStore({
    reducer: {
        [API.reducerPath]: API.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(API.middleware), 
});

export default Store;