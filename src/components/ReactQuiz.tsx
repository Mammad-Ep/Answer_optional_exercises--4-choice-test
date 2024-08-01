import React from 'react';
import styled3 from '../css/style3.module.css';
import { useNavigate } from 'react-router-dom';
import { examiner, examinerResult } from '../dataTypes/types/quizReact';
import { useGetExaminerQuery, useGetQuestionsQuery } from '../apps/services/ReactQuizApi';
// ___________________________________________________________


const ReactQuiz = ({ examiner, changeExaminer }: { examiner: examiner, changeExaminer: any }) => {
    const { data: ExaminerList, isError, isLoading, isFetching } = useGetExaminerQuery(null)
    const redirect = useNavigate();


    const submitHandler = (event: any) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const person = {
            name: form.get('fname'),
            family: form.get('lname'),
            phone_number: form.get('phone'),
        };

        if (ExaminerList?.find((e: examinerResult) => e.phone_number == person.phone_number)) {
            alert('با این مشخصات قبلا آزمون داده شده است')
        
        } else {
            changeExaminer({ questionsResult: {}, pageNumber: 0, info: person })
            redirect('/ReactQuiz-questions/')
        }

    };

    return (
        <div className={styled3['quizReact-container']}>
            <h1>سلام وقت بخیر، به آزمون ریکت خوش آمدید</h1>
            <p>نام و نام خانوادگی را بصورت دقیق وارد کنید</p>
            <form method='post' className={styled3['form-Info-box']} onSubmit={submitHandler}>
                <input type="text" id='fname' name='fname' placeholder='نام' required={true} />
                <input type="text" id='lname' name='lname' placeholder='نام خانوادگی' required={true} />
                <input type="text" id='phone' name='phone' placeholder='شماره موبایل' maxLength={11} required={true} minLength={11} />
                <button type="submit">شروع آزمون</button>

            </form>
        </div>
    )
}

export default ReactQuiz;