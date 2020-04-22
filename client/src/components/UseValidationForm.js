import { useState, useEffect } from 'react';

// Cоздаём кастомный хук UseLogin.
const UseValidationForm = (callback, initialState = {}, Validation) => {

    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Создаём функцию изменения.
    const handleChange = (event) => {
        const { name, value } = event.target;

        setValues({
            ...values,
            [name]: value
        });
    };

    // Создаём функцию отправки.
    const handleSubmit = (event) => {
        event.preventDefault();
        // Обработчик ошибок.
        setErrors(Validation(values));
        setIsSubmitting(true);
    };

    const handleReset = (event) => {
        //console.log('Reset completed.');
        setIsSubmitting(false);
        setErrors({});
        setValues(initialState);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
            setIsSubmitting(false);
        }
    }, [errors, callback, isSubmitting]);

    return {
        handleChange,
        handleReset,
        handleSubmit,
        setValues,
        values,
        errors,
    };
};

export default UseValidationForm;