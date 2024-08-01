import { number, string } from "prop-types"

export type questionType = {
    id: number,
    text_question: string,
    options: string[],
    correct_answer: number,
    question_score: number,
    status: boolean
}

export type examiner = {
    info: {
        name: string,
        family: string,
        phone_number: string,
        exam_score?: number,
    },

    pageNumber: number,
    questionsResult: {
    }

} | any


export type examinerResult = {
    name: string,
    family: string,
    phone_number: string,
    exam_score: number,
    numberRightAnswers: number,
    numberWrongAnswers: number,
    passingExam: boolean
}| any