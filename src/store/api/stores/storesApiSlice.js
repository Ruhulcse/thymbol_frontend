import { apiSlice } from '../apiSlice';

export const storesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStores: builder.query({
            query: (userId) => `store/owner-stores/${userId}`,
            providesTags: ['Stores'],
            transformResponse: (response) => response.data,
        }),
        getStore: builder.query({
            query: (storeId) => `store/${storeId}`,
            providesTags: ['Store'],
            transformResponse: (response) => response.data,
        }),
        createStore: builder.mutation({
            query: ({ storeData }) => ({
                url: 'store/create-store',
                method: 'POST',
                body: storeData,
            }),
            invalidatesTags: (result, error, { userId }) => ['Stores', 'Store'],
        }),
        deleteStore: builder.mutation({
            query: ({ id }) => ({
                url: `store/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { userId }) => ['Stores', 'Store'],
        }),
        getFavoriteStores: builder.query({
            query: () => `get_favourite`,
            providesTags: ['Favorite_Store'],
            transformResponse: (response) => response.data,
        }),
        favoriteStore: builder.mutation({
            query: ({ favourite_stores }) => ({
                url: 'add_favourite',
                method: 'POST',
                body: favourite_stores,
            }),
            invalidatesTags: (result, error, { userId }) => ['Favorite_Store'],
        }),
    }),
});

export const { useGetStoresQuery, useCreateStoreMutation, useGetStoreQuery, useDeleteStoreMutation, useFavoriteStoreMutation, useGetFavoriteStoresQuery } = storesApi;
