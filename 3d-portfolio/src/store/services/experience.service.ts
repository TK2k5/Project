import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IExperience } from '@/types/experience.type'

export const experienceApi = createApi({
  reducerPath: 'experienceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Experience'],
  endpoints: (builder) => ({
    getAllExperience: builder.query<IExperience[], void>({
      query: () => '/experiences',
      providesTags: (result) => {
        return result
          ? [...result.map(({ id }) => ({ type: 'Experience', id }) as const), { type: 'Experience', id: 'LIST' }]
          : [{ type: 'Experience', id: 'LIST' }]
      }
    }),
    deleteExperience: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `/experiences/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Experience', id }]
    }),
    createExperience: builder.mutation<IExperience, Partial<IExperience>>({
      query: (body) => ({
        url: '/experiences',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Experience', id: 'LIST' }]
    }),
    getOneExperience: builder.query<IExperience, string>({
      query: (id) => {
        return `/experiences/${id}`
      },
      providesTags: (result, error, id) => [{ type: 'Experience', id }]
    }),
    updateExperience: builder.mutation<IExperience, Partial<IExperience>>({
      query: (body) => ({
        url: `/experiences/${body.id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Experience', id }]
    })
  })
})

export const {
  useGetAllExperienceQuery,
  useDeleteExperienceMutation,
  useCreateExperienceMutation,
  useGetOneExperienceQuery,
  useUpdateExperienceMutation
} = experienceApi
