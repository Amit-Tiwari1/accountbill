import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../services/api/axiosInstance';

interface AuthState {
    phone: string;
    otpSent: boolean;
    token: string;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    phone: '',
    otpSent: false,
    token: '',
    loading: false,
    error: null,
};

// Send OTP API call
export const sendOtp = createAsyncThunk(
    'auth/sendOtp',
    async ({ phone, fcmToken }: { phone: string; fcmToken: string }, { rejectWithValue }) => {
        try {


            const response = await api.post('?route=auth/sendOtp', {
                phone,
                fcmToken,
            });

            return {
                phone,
                success: true,
                data: response.data,
            };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || 'Failed to send OTP');
        }
    }
);

// Verify OTP API call
export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async ({ userId, otp }: { userId: string; otp: string }, { rejectWithValue }
    ) => {

        console.log(userId, otp);

        try {
            const response = await api.post('?route=auth/verifyOtp', {
                userId,
                otp,
            });


            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || 'OTP verification failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuth: (state) => {
            state.phone = '';
            state.otpSent = false;
            state.token = '';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // sendOtp
        builder.addCase(sendOtp.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(sendOtp.fulfilled, (state, action: PayloadAction<{ phone: string; success: boolean }>) => {
            state.loading = false;
            if (action.payload.success) {
                state.phone = action.payload.phone;
                state.otpSent = true;
            }
        });
        builder.addCase(sendOtp.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });

        // verifyOtp
        builder.addCase(verifyOtp.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(verifyOtp.fulfilled, (state, action: PayloadAction<{ token: string; phone: string }>) => {
            state.loading = false;
            state.token = action.payload.token;
            state.phone = action.payload.phone;
        });
        builder.addCase(verifyOtp.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
