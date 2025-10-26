import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import fcmReducer from './slices/fcmSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        fcm: fcmReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
