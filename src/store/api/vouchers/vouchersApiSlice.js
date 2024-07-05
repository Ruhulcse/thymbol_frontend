import { apiSlice } from '../apiSlice';

export const vouchersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVouchers: builder.query({
            query: (userId) => `voucher`,
            providesTags: ['Vouchers'],
        }),
        getVoucher: builder.query({
            query: (voucherId) => `voucher/${voucherId}`,
            providesTags: ['Voucher'],
            // transformResponse: (response) => response.data,
        }),
        getClippedVoucher: builder.query({
            query: (userId) => `voucher/clipped-details/${userId}`,
            providesTags: ['ClippedVoucher'],
            transformResponse: (response) => response.data,
        }),
        getVoucherByStore: builder.query({
            query: (storeId) => `voucherbystore/${storeId}`,
            providesTags: ['Store'],
            transformResponse: (response) => response.data,
        }),
        createVoucher: builder.mutation({
            query: ({ voucherData }) => ({
                url: 'voucher',
                method: 'POST',
                body: voucherData,
            }),
            invalidatesTags: (result, error, { userId }) => ['Vouchers', 'Voucher', 'Store', 'ClippedVoucher'],
        }),
    }),
});

export const { useGetVouchersQuery, useCreateVoucherMutation, useGetVoucherByStoreQuery, useGetVoucherQuery, useGetClippedVoucherQuery } = vouchersApi;
