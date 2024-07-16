import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Category', 'SubCategory', 'Stores', 'Vouchers', 'Voucher', 'Store', 'ClippedVoucher', 'PushNotifications', 'Favorite_Store', 'ConsumerCategory'],
    endpoints: (builder) => ({}),
});
