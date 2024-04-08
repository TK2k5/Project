// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IExperience } from '~/types/experience.type';

export const experienceApi = createApi({
  reducerPath: 'experienceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['experience'],
  endpoints: (build) => ({
    getExperiences: build.query<IExperience[], void>({
      query: () => '/experience',
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: 'experience', id }) as const),
              { type: 'experience', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'experience', id: 'LIST' }` is invalidated
            [{ type: 'experience', id: 'LIST' }],
    }),
    addExperience: build.mutation<IExperience, Partial<IExperience>>({
      query(body) {
        return {
          url: `/experience`,
          method: 'POST',
          body,
        };
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: 'experience', id: 'LIST' }],
    }),
    getOneExperience: build.query<IExperience, number>({
      query: (id) => `/experience/${id}`,
      providesTags: (result, error, id) => [{ type: 'experience', id }],
    }),
    updateExperience: build.mutation<IExperience, Partial<IExperience>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/experience/${id}`,
          method: 'PUT',
          body,
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getexperience` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { id }) => [{ type: 'experience', id }],
    }),
    deleteExperience: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/experience/${id}`,
          method: 'DELETE',
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: 'experience', id }],
    }),
  }),
});

export const {
  useGetExperiencesQuery,
  useAddExperienceMutation,
  useGetOneExperienceQuery,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;
