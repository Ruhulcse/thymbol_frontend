import { apiSlice } from '../apiSlice';

export const storesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStores: builder.query({
            query: (userId) => `store/owner-stores/${userId}`,
            providesTags: ['Stores'],
            transformResponse: (response) => response.data,
        }),
        createStore: builder.mutation({
            query: ({ storeData }) => ({
                url: 'store/create-store',
                method: 'POST',
                body: storeData,
            }),
            invalidatesTags: (result, error, { userId }) => ['Stores'],
        }),
    }),
});

export const { useGetStoresQuery, useCreateStoreMutation } = storesApi;
