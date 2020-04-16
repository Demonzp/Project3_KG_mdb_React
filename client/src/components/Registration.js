import React, { useState } from 'react';
import axios from 'axios';
import {
    Card,
    CardBody,
    CardHeader,
    Container,
    Button,
    Form,
    FormGroup, 
    Input, 
    Label
} from 'reactstrap';
import UseValidationForm from './UseValidationForm';
import {Registration as Validation} from '../validation';
import { useHistory } from 'react-router-dom';

import './ValidationForm.css';

const Registration = () => {

    const history = useHistory();

    const [res_error, setResponsError] = useState({});

    const { handleChange, handleSubmit, values, errors } = UseValidationForm(
        submit,
        { login: '', email: '', password: '' },
        Validation
    );

    // POST
    function submit(){
        axios
            .post('http://localhost:5000/registration', values)
            .then(() => history.push('/login'))
            .catch((err) => {
                console.error(err);
                if (err.response) {
                    setResponsError(err.response.data);
                }
            });
    };

    return (
        <Container className="themed-container">
            <Card body outline color="primary">
                <CardHeader>Please fill the fields below:</CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit} noValidate>
                        <FormGroup>
                            <Label for='login'>Login</Label>
                            <div>
                                <Input
                                    className={`${errors.login && 'inputError'}`}
                                    id='login'
                                    name='login'
                                    value={values.login}
                                    onChange={handleChange}
                                />
                                {errors.login && <p className='error'>{errors.login}</p>}
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for='email'>Email</Label>
                            <div>
                                <Input 
                                    className={`${errors.email && 'inputError'}`}
                                    id='email'
                                    name='email'
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className='error'>{errors.email}</p>}
                            </div>    
                        </FormGroup>
                        <FormGroup>
                            <Label for='password'>Password</Label>
                            <div>
                                <Input
                                    className={`${errors.password && 'inputError'}`}
                                    id='password'
                                    name='password'
                                    type='password'
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <p className='error'>{errors.password}</p>}
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div>
                                {res_error && <p className='error'>{res_error.message}</p>}
                            </div>
                        </FormGroup>
                        <Button color='primary' type='submit'>Registration</Button>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default Registration;