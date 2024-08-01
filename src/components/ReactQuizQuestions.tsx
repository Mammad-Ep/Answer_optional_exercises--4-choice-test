import React, { useEffect, useState } from 'react';
import { examiner, questionType } from '../dataTypes/types/quizReact';
import { useGetQuestionsQuery } from '../apps/services/ReactQuizApi';
import styled3 from '../css/style3.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from 'jquery';
import { useAddExaminerMutation } from '../apps/services/ReactQuizApi';
import checkEmpty from '../img/icons/check-box-empty.png';
import check from '../img/icons/check-box.png';
import { useNavigate } from 'react-router-dom';

// ___________________________________________________________


const ReactQuizQuestions = ({ examiner, changeExaminer }: { examiner: examiner, changeExaminer: any }) => {
    const { data: reactQuestions, isError, isLoading, isFetching } = useGetQuestionsQuery(examiner?.pageNumber);
    const [addExaminer, { isError: isAddError }] = useAddExaminerMutation();
    const questionNumber = examiner?.pageNumber + 1;
    const redirect = useNavigate();

    useEffect(() => {
        $(`label`).before().on('click', function () {
            $(this).prev().attr('checked', 'checked')
        })

    });

    useEffect(() => {
        // cheked Radio input
        const temp = examiner?.questionsResult[String(questionNumber)];
        if (temp !== null) {
            const questionChecked = temp?.at(0)
            console.log(questionChecked)

            $(`input[value=${questionChecked}]`).attr('checked', 'checked');
        }

    }, [examiner]);




    const changeHandler = (event: any): void => {
        const value = Number(event.target.value);
        const correct_answer = reactQuestions?.at(0)?.correct_answer;


        if (value == correct_answer) {
            let questionsResult = examiner?.questionsResult;
            questionsResult[`${questionNumber}`] = [value, true];
            changeExaminer({ ...examiner, questionsResult: questionsResult })

        } else {
            let questionsResult = examiner?.questionsResult;
            questionsResult[`${questionNumber}`] = [value, false];
            changeExaminer({ ...examiner, questionsResult: questionsResult })
        }


    };

    const nextQuestionPage = () => {
        const page = Number(examiner.pageNumber);

        if (page < 9) {
            changeExaminer({ ...examiner, pageNumber: page + 1 })
        }
    };

    const previousQuestionPage = () => {
        const page = Number(examiner.pageNumber);

        if (page > 0) {
            changeExaminer({ ...examiner, pageNumber: page - 1 })
        }
    };

    const resultQuiz = () => {
        let tempList = Object.values(examiner.questionsResult);
        const questionsAnswers = tempList.map((item: any) => item.at(1))
        const numberRightAnswers = questionsAnswers.filter(q => q == true).length;

        const newExaminer = {
            name: examiner.info.name,
            family: examiner.info.family,
            phone_number: examiner.info.phone_number,
            exam_score: numberRightAnswers * 2,
            numberRightAnswers: numberRightAnswers,
            numberWrongAnswers: 10 - numberRightAnswers,
            passingExam: (numberRightAnswers * 2) > 13 ? true : false
        }

        addExaminer(newExaminer)

        redirect('/ReactQuiz-result/')
    }

    // -----------------------------------------------------------

    if (isError) {
        return <h2 className='error-message'>سرور با خطا مواجه شد</h2>
    }
    if (isFetching || isLoading) {
        return <h2 className=''>Loading...</h2>
    }
    return (
        <>
            <h1>{examiner?.pageNumber}</h1>
            <div className={styled3['question-container']}>
                <div>
                    <span>مشخصات آزمون دهنده : </span><strong>{examiner?.info.name} {examiner?.info.family}</strong>
                </div>
                {
                    reactQuestions?.map((q: questionType, index) => (
                        <div className={styled3['question-box']} key={q.id}>
                            <div className={styled3['text-question']}>
                                <p><span>{questionNumber}- </span>{q.text_question}</p>
                                <span>{q.question_score} نمره</span>
                            </div>
                            <form method="post" className={styled3['question-form']}>
                                {q.options.map((option, index) => (
                                    <div key={index}>

                                        <input type="radio" name='option' id={`option${index + 1}`} value={index + 1} onChange={changeHandler} />
                                        <label htmlFor={`option${index + 1}`} className='text-option'>{option}</label>
                                    </div>
                                ))}

                                <div className={styled3['btn-form-box']}>
                                    <button className={styled3['previous-question']} disabled={examiner.pageNumber < 1} onClick={previousQuestionPage}>قبلی</button>
                                    <button className={styled3['next-question']} disabled={examiner.pageNumber > 8} onClick={nextQuestionPage}>بعدی</button>
                                    {examiner.pageNumber > 8 && (
                                        <button type='button' className={styled3['complate-quiez-btn']} onClick={resultQuiz}>اتمام آزمون</button>
                                    )}
                                </div>
                            </form>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default ReactQuizQuestions