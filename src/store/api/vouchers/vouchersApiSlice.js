import { apiSlice } from '../apiSlice';

export const vouchersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVouchers: builder.query({
            query: (userId) => `voucher`,
            providesTags: ['Vouchers'],
        }),
        createVoucher: builder.mutation({
            query: ({ voucherData }) => ({
                url: 'voucher',
                method: 'POST',
                body: voucherData,
            }),
            invalidatesTags: (result, error, { userId }) => ['Vouchers'],
        }),
    }),
});

export const { useGetVouchersQuery, useCreateVoucherMutation } = vouchersApi;
