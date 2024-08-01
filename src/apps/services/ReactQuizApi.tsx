import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { examiner, examinerResult, questionType } from '../../dataTypes/types/quizReact';

// ___________________________________________________________

const ReactQuizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3070/' }),
    tagTypes: ['quizApi', 'examinerApi'],

    endpoints: (builder) => ({
        getQuestions: builder.query<questionType[], number>({
            // query: (page) => `questions?_page=${page}&_limit=2`,
            query: (page) => `questions?_start=${page}&_limit=1`,
            // query: (page) => `questions?_page=${page}&_per_page=1`,
            // query: (page) => `questions?_page=${page}&_per_page=2`,
            providesTags: ['quizApi']
        }),

        getExaminer: builder.query<examinerResult,null>({
            query: () => `examiners`,
            providesTags:['examinerApi']
        }),

        addExaminer: builder.mutation<null, examiner>({
            query: (newExaminer) => ({
                url: `examiners`,
                method: 'POST',
                body: newExaminer

            }),
            invalidatesTags: ['quizApi']
        })
    })
});


export default ReactQuizApi;
export const { useGetQuestionsQuery,useGetExaminerQuery, useAddExaminerMutation } = ReactQuizApi;