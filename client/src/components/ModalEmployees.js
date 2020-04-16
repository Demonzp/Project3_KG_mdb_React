import React from 'react';

import { 
    Button, 
    FormGroup, 
    Input, 
    Label, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Form
} from 'reactstrap';

const ModalEmployees = ({ modal, toggleModal, handleModalSubmit, handleChange, btn_title, values, errors })=>{
    //console.log('values = ', values);
    return(
        <Modal isOpen={modal} toggle={toggleModal}>
            <Form onSubmit={handleModalSubmit}>
                <ModalHeader toggle={toggleModal}>Add new employee</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <div>
                            <Label for='name'>Name</Label>
                            <Input id='name' name='name' placeholder='ex.: John Smith' value={values.name} onChange={handleChange} />
                            {errors.name && <p className='error'>{errors.name}</p>}
                        </div>
                        <br />
                        <div>
                            <Label for='sex'>Sex</Label>
                            <Input type='select' id='sex' name='sex' value={values.sex} onChange={handleChange} >
                                <option>None</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </Input>
                            {errors.sex && <p className='error'>{errors.sex}</p>}
                        </div>
                        <br />
                        <div>
                            <Label for='birthday'>Birthday</Label>
                            <Input type='date' id='birthday' name='birthday' value={values.birthday} onChange={handleChange} />
                            {errors.birthday && <p className='error'>{errors.birthday}</p>}
                        </div>
                        <br />
                        <div>
                            <Label for='contacts'>Contacts</Label>
                            <Input type='textarea' id='contacts' name='contacts' placeholder='adress, phone, e-mail etc.' value={values.contacts} onChange={handleChange} />
                            {errors.contacts && <p className='error'>{errors.contacts}</p>}
                        </div>
                        <br />
                        <div>
                            <Label for='position'>Position</Label>
                            <Input id='position' name='position' placeholder='current position in company' value={values.position} onChange={handleChange} />
                            {errors.position && <p className='error'>{errors.position}</p>}
                        </div>
                        <br />
                        <div>
                            <Label for='salary'>Salary</Label>
                            <Input id='salary' name='salary' placeholder='ex.: 1000.00' value={values.salary} onChange={handleChange} />
                            {errors.salary && <p className='error'>{errors.salary}</p>}
                        </div>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type='submit' color='primary'>{btn_title}</Button>{' '}
                    <Button color='secondary' onClick={toggleModal}>CANCEL</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
}

export default ModalEmployees;