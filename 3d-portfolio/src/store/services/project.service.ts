import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IProject } from 'src/types/project.type'

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_URL_BE as string }),
  tagTypes: ['Project'],
  endpoints: (builder) => ({
    getAllProjects: builder.query<IProject[], void>({
      query: () => '/projects',
      providesTags: (result) => {
        return result
          ? [...result.map(({ id }) => ({ type: 'Project', id }) as const), { type: 'Project', id: 'LIST' }]
          : [{ type: 'Project', id: 'LIST' }]
      }
    }),
    deleteProject: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `/projects/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Project', id }]
    }),
    createProject: builder.mutation<IProject, Partial<IProject>>({
      query: (body) => ({
        url: '/projects',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Project', id: 'LIST' }]
    }),
    getOneProject: builder.query<IProject, string>({
      query: (id) => {
        return `/projects/${id}`
      },
      providesTags: (_, __, id) => [{ type: 'Project', id }]
    }),
    updateProject: builder.mutation<IProject, Partial<IProject>>({
      query: (body) => ({
        url: `/projects/${body.id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Project', id }]
    })
  })
})

export const {
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
  useCreateProjectMutation,
  useGetOneProjectQuery,
  useUpdateProjectMutation
} = projectApi
