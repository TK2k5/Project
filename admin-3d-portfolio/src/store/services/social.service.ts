import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ISocial } from './../../types/social.type';

export const socialApi = createApi({
  reducerPath: 'socialApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Social'],
  endpoints: (builder) => ({
    getAllSocials: builder.query<ISocial[], void>({
      query: () => '/socials',
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: 'Social', id }) as const),
              { type: 'Social', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Social', id: 'LIST' }],
    }),
    deleteSocial: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/socials/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Social', id }],
    }),
    addSocial: builder.mutation<ISocial, Partial<ISocial>>({
      query: (body) => ({
        url: '/socials',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Social', id: 'LIST' }],
    }),
    getOneSocial: builder.query<ISocial, string>({
      query: (id) => {
        return `/socials/${id}`;
      },
      providesTags: (result, error, id) => [{ type: 'Social', id }],
    }),
    updateSocial: builder.mutation<ISocial, Partial<ISocial>>({
      query: (body) => ({
        url: `/socials/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Social', id }],
    }),
  }),
});

export const {
  useGetAllSocialsQuery,
  useDeleteSocialMutation,
  useAddSocialMutation,
  useGetOneSocialQuery,
  useUpdateSocialMutation,
} = socialApi;
