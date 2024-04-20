import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ICertificate } from '~/types/certificate';

export const certificateApi = createApi({
  reducerPath: 'certificateApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Certificate'],
  endpoints: (builder) => ({
    getAllCertificate: builder.query<ICertificate[], void>({
      query: () => '/certificates',
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: 'Certificate', id }) as const),
              { type: 'Certificate', id: 'LIST' },
            ]
          : [{ type: 'Certificate', id: 'LIST' }];
      },
    }),
    deleteCertificate: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `/certificates/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Certificate', id }],
    }),
    createCertificate: builder.mutation<ICertificate, Partial<ICertificate>>({
      query: (body) => ({
        url: '/certificates',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Certificate', id: 'LIST' }],
    }),
    getOneCertificate: builder.query<ICertificate, string>({
      query: (id) => {
        return `/certificates/${id}`;
      },
      providesTags: (_, __, id) => [{ type: 'Certificate', id }],
    }),
    updateCertificate: builder.mutation<ICertificate, Partial<ICertificate>>({
      query: (body) => ({
        url: `/certificates/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (__, _, { id }) => [{ type: 'Certificate', id }],
    }),
  }),
});

export const {
  useGetAllCertificateQuery,
  useDeleteCertificateMutation,
  useCreateCertificateMutation,
  useGetOneCertificateQuery,
  useUpdateCertificateMutation,
} = certificateApi;
