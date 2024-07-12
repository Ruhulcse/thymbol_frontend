import { apiSlice } from '../apiSlice';

export const pushNotificationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPushNotifications: builder.query({
            query: (userId) => `push-notificaton/all`,
            providesTags: ['PushNotifications'],
            transformResponse: (response) => response.data,
        }),

        createPushNotifiation: builder.mutation({
            query: ({ data }) => ({
                url: 'push-notificaton/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, { userId }) => ['PushNotifications'],
        }),
    }),
});

export const { useGetPushNotificationsQuery, useCreatePushNotifiationMutation } = pushNotificationsApi;
