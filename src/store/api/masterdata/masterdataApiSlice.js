import { apiSlice } from '../apiSlice';

export const masterdataApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'store/categories',
            providesTags: ['Category'],
        }),
        getSubCategory: builder.query({
            query: (subCatId) => `store/sub-categories/${subCatId}`,
            providesTags: (result, error, subCatId) => [
                { type: 'SubCategory', id: subCatId },
            ],
        }),
        getAllConsumerCategories: builder.query({
            query: () => 'category/get-all-categories',
            providesTags: ['ConsumerCategory'],
        }),
    }),
});

export const { useGetCategoriesQuery, useLazyGetSubCategoryQuery, useGetAllConsumerCategoriesQuery } =
    masterdataApi;
