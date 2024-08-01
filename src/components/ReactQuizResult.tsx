import React, { useEffect, useState } from 'react';
import { examiner, examinerResult } from '../dataTypes/types/quizReact';
import { useGetExaminerQuery, useGetQuestionsQuery } from '../apps/services/ReactQuizApi';
import styled3 from '../css/style3.module.css';
// ___________________________________________________________

const ReactQuizResult = ({ examiner }: { examiner: examiner }) => {
    const { data: ExaminerList, isError, isLoading, isFetching } = useGetExaminerQuery(null)
    const [currentExaminer, setCurrentExaminer] = useState<examinerResult>({})

    useEffect(() => {
        setCurrentExaminer(ExaminerList?.find((e: examinerResult) => e.phone_number == examiner.info.phone_number))

    }, [ExaminerList]);




    // -----------------------------------------------------------

    if (isError) {
        return <h2 className='error-message'>سرور با خطا مواجه شد</h2>
    }
    if (isFetching || isLoading) {
        return <h2 className=''>Loading...</h2>
    }
    return (
        <>
            <div className={styled3['result-container']}>
                <table className={styled3['table-result']}>
                    <caption>نتیجه آزمون</caption>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>نام</th>
                            <th>نام خانوادگی</th>
                            <th>شماره موبایل</th>
                            <th>پاسخ درست</th>
                            <th>پاسخ اشتباه</th>
                            <th>نمره</th>
                            <th>وضعیت قبولی</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{currentExaminer?.id}</td>
                            <td>{currentExaminer?.name}</td>
                            <td>{currentExaminer?.family}</td>
                            <td>{currentExaminer?.phone_number}</td>
                            <td>{currentExaminer?.numberRightAnswers}</td>
                            <td>{currentExaminer?.numberWrongAnswers}</td>
                            <td>{currentExaminer?.exam_score}</td>
                            <td>{currentExaminer?.passingExam ? "قبول" : "مردود"}</td>
                        </tr>

                    </tbody>
                </table>
                <p className={styled3['text-tip']}>*نکته: حداقل نمره قبولی <span>13</span> میباشد</p>
                <p className={styled3['text-passingExam']}>{currentExaminer?.passingExam ?
                    (<span className={styled3['passingExam']}>تبریک میگم شما در این آزمون با نمره {currentExaminer?.exam_score} قبول شدید</span>
                    ) : (
                        <span>متاسفانه شما در این آزمون با نمره {currentExaminer?.exam_score} مردود شدید </span>
                    )}</p>
            </div>
        </>
    )
}

export default ReactQuizResult