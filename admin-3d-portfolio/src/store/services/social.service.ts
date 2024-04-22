import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ISocial } from '~/types/social.type';

export const socialApi = createApi({
  reducerPath: 'socialApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Social'],
  endpoints: (builder) => ({
    getAllSocial: builder.query<ISocial[], void>({
      query: () => '/socials',
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: 'Social', id }) as const),
              { type: 'Social', id: 'LIST' },
            ]
          : [{ type: 'Social', id: 'LIST' }];
      },
    }),
    deleteSocial: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `/socials/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Social', id }],
    }),
    createSocial: builder.mutation<ISocial, Partial<ISocial>>({
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
      providesTags: (_, __, id) => [{ type: 'Social', id }],
    }),
    updateSocial: builder.mutation<ISocial, Partial<ISocial>>({
      query: (body) => ({
        url: `/socials/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (__, _, { id }) => [{ type: 'Social', id }],
    }),
  }),
});

export const {
  useGetAllSocialQuery,
  useDeleteSocialMutation,
  useCreateSocialMutation,
  useGetOneSocialQuery,
  useUpdateSocialMutation,
} = socialApi;
