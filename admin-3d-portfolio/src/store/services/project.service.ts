import { IProject, IProjectDocs } from '~/types/project.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Project'],
  endpoints: (builder) => ({
    getAllProjects: builder.query<IProjectDocs, void>({
      query: () => '/projects',
      providesTags: (result) => {
        return result
          ? [
              ...result.items.map(
                ({ id }) => ({ type: 'Project', id }) as const,
              ),
              { type: 'Project', id: 'LIST' },
            ]
          : [{ type: 'Project', id: 'LIST' }];
      },
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Project', id }],
    }),
    createProject: builder.mutation<IProject, Partial<IProject>>({
      query: (body) => ({
        url: '/projects',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Project', id: 'LIST' }],
    }),
    getOneProject: builder.query<IProject, string>({
      query: (id) => {
        return `/projects/${id}`;
      },
      providesTags: (result, error, id) => [{ type: 'Project', id }],
    }),
    updateProject: builder.mutation<IProject, Partial<IProject>>({
      query: (body) => ({
        url: `/projects/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Project', id }],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
  useCreateProjectMutation,
  useGetOneProjectQuery,
  useUpdateProjectMutation,
} = projectApi;
