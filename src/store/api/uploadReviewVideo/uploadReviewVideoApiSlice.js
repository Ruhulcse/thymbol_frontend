import { apiSlice } from '../apiSlice';

export const uploadVideoReviewApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviewVideos: builder.query({
            query: ({ store_id }) => `get_reviewbystoreid/${store_id}`,
            providesTags: ['UploadVideoReview'],
            // transformResponse: (response) => response.data
        }),
        postReviewVideo: builder.mutation({
            query: (data) => ({
                url: 'create_review',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['UploadVideoReview']
        }),

    }),
});

export const { useGetReviewVideosQuery, usePostReviewVideoMutation } = uploadVideoReviewApi;
