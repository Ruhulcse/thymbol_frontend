import fetchWrapper from '@/util/fetchWrapper';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    success: false,
    users: [],
};

export const getAllUsers = createAsyncThunk(
    'users/getUsers',
    async ({ user_id }) => {
        const payload = {
            user_id,
            user_type: 'admin',
        };
        try {
            const response = await fetchWrapper.post(
                `specefic-type-of-users`,
                payload
            );
            return response?.data?.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || 'Failed to fetch users data';
            });
    },
});

export default usersSlice.reducer;
