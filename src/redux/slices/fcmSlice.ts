import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FcmState {
    token: string | null;
}

const initialState: FcmState = {
    token: null,
};

const fcmSlice = createSlice({
    name: 'fcm',
    initialState,
    reducers: {
        setFcmToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});

export const { setFcmToken } = fcmSlice.actions;
export default fcmSlice.reducer;
