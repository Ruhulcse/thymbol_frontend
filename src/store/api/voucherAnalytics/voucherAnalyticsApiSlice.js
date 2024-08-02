import { apiSlice } from '../apiSlice';

export const voucherAnalyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVoucherAnalytics: builder.query({
            query: () => `voucher/get/analytics`,
            providesTags: ['VoucherAnalytics'],
            transformResponse: (response) => response.data
        }),

    }),
});

export const { useGetVoucherAnalyticsQuery } = voucherAnalyticsApi;
