import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiService = createApi({
    reducerPath: 'apiService',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3003/' }), 
    endpoints: (builder) => ({
        getFilms: builder.query({
            query: () => 'items',
        }),
        getFilmById: builder.query({
            query: (id) => `items/${id}`,
        }),
        addFilm: builder.mutation({
            query: (newPost) => ({
                url: 'items',
                method: 'POST',
                body: newPost,
            }),
        }),
        updateFilm: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `items/${id}`,
                method: 'PUT',
                body: patch,
            }),
        }),
        deleteFilm: builder.mutation({
            query: (id) => ({
                url: `items/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetFilmsQuery,
    useGetFilmByIdQuery,
    useAddFilmMutation,
    useUpdateFilmMutation,
    useDeleteFilmMutation,
} = apiService;