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
        createClippedVoucher: builder.mutation({
            query: ({ data }) => ({
                url: 'voucher/clipped-for-later',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, { userId }) => ['ClippedVoucher'],
        }),
        redeemVoucher: builder.mutation({
            query: ({ data }) => ({
                url: 'qrcodedata',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, { userId }) => ['Vouchers', 'Voucher', 'Store', 'ClippedVoucher'],
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

export const { useGetVouchersQuery, useCreateVoucherMutation, useGetVoucherByStoreQuery, useGetVoucherQuery, useGetClippedVoucherQuery, useCreateClippedVoucherMutation, useRedeemVoucherMutation } = vouchersApi;
