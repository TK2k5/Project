import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ISkill } from '~/types/skill.type';

export const skillApi = createApi({
  reducerPath: 'skillApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Skill'],
  endpoints: (builder) => ({
    getAllSkills: builder.query<ISkill[], void>({
      query: () => '/skills',
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: 'Skill', id }) as const),
              { type: 'Skill', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Skill', id: 'LIST' }],
    }),
    deleteSkill: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/skills/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Skill', id }],
    }),
    addSkill: builder.mutation<ISkill, Partial<ISkill>>({
      query: (body) => ({
        url: '/skills',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Skill', id: 'LIST' }],
    }),
    getOneSkill: builder.query<ISkill, string>({
      query: (id) => {
        return `/skills/${id}`;
      },
      providesTags: (result, error, id) => [{ type: 'Skill', id }],
    }),
    updateSkill: builder.mutation<ISkill, Partial<ISkill>>({
      query: (body) => ({
        url: `/skills/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Skill', id }],
    }),
  }),
});

export const {
  useGetAllSkillsQuery,
  useDeleteSkillMutation,
  useAddSkillMutation,
  useGetOneSkillQuery,
  useUpdateSkillMutation,
} = skillApi;
