import React, { useState } from 'react';
import UseValidationForm from './UseValidationForm';
import { Login as ValidationLogin } from '../validation';
import { Container, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import './ValidationForm.css';
import axios from 'axios';

const Login = ({auth}) => {
    const [resError, setResponsError] = useState({});

    const { handleChange, handleSubmit, values, errors } = UseValidationForm(
        submit,
        { email: '', password: '' },
        ValidationLogin
    );

    function submit(){
        axios
            .post('http://localhost:5000/signin', values)
            .then((res) => auth(res.data.token))
            .catch((error)=>{
                console.error(error);
                if (error.response) {
                    setResponsError(error.response.data);
                }
            });
    }

    return (
        <Container className="themed-container">
            <Form onSubmit={handleSubmit} noValidate>
                <FormGroup>
                    <Label for='email'>Email:</Label>
                    <div>
                        <Input
                            className={`${errors.email && 'inputError'}`}
                            type='email'
                            name='email'
                            id='email'
                            placeholder='example@gmail.com'
                            value={values.email}
                            onChange={handleChange} />
                        {errors.email && <p className='error'>{errors.email}</p>}
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label for='password'>Password:</Label>
                    <div>
                        <Input
                            className={`${errors.password && 'inputError'}`}
                            type='password'
                            name='password'
                            id='password'
                            value={values.password}
                            onChange={handleChange} />
                        {errors.password && <p className='error'>{errors.password}</p>}
                    </div>
                </FormGroup>
                <div>
                    {resError && <p className='error'>{resError.message}</p>}
                </div>
                <Button type='submit' color='primary' size='sm'>SUBMIT</Button>
            </Form>
        </Container>
    );
};

export default Login;