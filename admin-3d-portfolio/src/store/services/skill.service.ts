import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ISkill } from './../../../../3d-portfolio/src/types/skill.type';

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
    addSkill: builder.mutation<void, ISkill>({
      query: (skill: ISkill) => ({
        url: `/skills`,
        method: 'POST',
        body: skill,
      }),
      invalidatesTags: [{ type: 'Skill', id: 'LIST' }],
    }),
    getOneSkill: builder.query<ISkill, number | string>({
      query: (id: number | string) => `/skills/${id}`,
    }),
    updateSkill: builder.mutation<ISkill, Partial<ISkill>>({
      query: (skill) => ({
        url: `/skills/${skill.id}`,
        method: 'PUT',
        body: skill,
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
