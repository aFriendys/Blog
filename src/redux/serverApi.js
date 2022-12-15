import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'serverApi',
  tagTypes: ['Articles', 'Article'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ offset, token }) => ({
        url: 'articles',
        params: { offset, limit: 5 },
        headers: { Authorization: token },
      }),
      providesTags: ({ result }) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Articles', id })), { type: 'Articles', id: 'LIST' }]
          : [{ type: 'Articles', id: 'LIST' }],
    }),
    getCurrentUser: builder.query({
      query: (token) => ({ url: 'user', headers: { Authorization: token } }),
    }),
    registerUser: builder.mutation({
      query: (body) => ({ url: 'users', method: 'POST', body }),
    }),
    authorizeUser: builder.mutation({
      query: (body) => ({ url: 'users/login', method: 'POST', body }),
    }),
    favoriteArticle: builder.mutation({
      query: ({ token, slug, value }) => ({
        url: `articles/${slug}/favorite`,
        headers: { Authorization: token },
        method: value === true ? 'POST' : 'DELETE',
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    updateUser: builder.mutation({
      query: ({ token, body }) => ({
        url: 'user',
        headers: { Authorization: token },
        method: 'PUT',
        body: { user: body },
      }),
    }),
    getArticle: builder.query({
      query: ({ slug, token }) => ({
        url: `articles/${slug}`,
        headers: { Authorization: token },
      }),
      providesTags: ({ result }) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Article', id })), { type: 'Article', id: 'ONE' }]
          : [{ type: 'Article', id: 'ONE' }],
    }),
    createArticle: builder.mutation({
      query: ({ token, body }) => ({
        url: 'articles',
        headers: { Authorization: token },
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    updateArticle: builder.mutation({
      query: ({ token, slug, body }) => ({
        url: `/articles/${slug}`,
        headers: { Authorization: token },
        body,
        method: 'PUT',
      }),
      invalidatesTags: [
        { type: 'Article', id: 'ONE' },
        { type: 'Articles', id: 'LIST' },
      ],
    }),
    deleteArticle: builder.mutation({
      query: ({ token, slug }) => ({
        url: `/articles/${slug}`,
        headers: { Authorization: token },
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
  }),
});

export default api;
