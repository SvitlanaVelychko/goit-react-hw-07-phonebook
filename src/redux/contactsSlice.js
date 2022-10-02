import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
    reducerPath: 'contacts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://63372b1b5327df4c43d0fd3a.mockapi.io',
    }),
    tagTypes: ['Contact'],
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => '/contacts',
            providesTags: ['Contact'],
        }),
        // getContactById: builder.query({
        //     query: id => `/contacts/${id}`,
        //     providesTags: ['Contact'],
        // }),
        addContact: builder.mutation({
            query: data => ({
                url: '/contacts',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Contact'],
        }),
        deleteContact: builder.mutation({
            query: id => ({
                url: `/contacts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contact'],
        }),
        updateContact: builder.mutation({
            query: data => ({
                url: `/contacts/${data.id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Contact'],
        }),
    }),
});

export const {
    useGetContactsQuery,
    useGetContactByIdQuery,
    useAddContactMutation,
    useDeleteContactMutation,
    useUpdateContactMutation } = contactsApi;