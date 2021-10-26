import { useState, useEffect } from 'react';

const UseValidationForm = (callback, initialState = {}, Validation) => {

    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        setIsSubmitting(true);
    };

    const handleReset = (event) => {
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