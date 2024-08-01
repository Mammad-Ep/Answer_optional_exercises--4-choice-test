import React, { useState, useEffect } from 'react';
import { examiner } from '../../dataTypes/types/quizReact';

const useLocalStorage = (key:string, initValue:examiner) => {
    const [value, setValue] = useState(() => {
        const temp = window.localStorage.getItem(key);
        return temp ? JSON.parse(temp) : initValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value))
    }, [value]);

    return [value, setValue]
}

export default useLocalStorage;