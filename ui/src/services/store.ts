import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiService } from './api-service';

const rootReducer = combineReducers({
[apiService.reducerPath]: apiService.reducer,
    });

    
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiService.middleware),
    });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;