import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Button, 
    Table
} from 'reactstrap';

import ModalEmployees from './ModalEmployees';

import UseValidationForm from './UseValidationForm';
import {Employees as Validation} from '../validation';

import UsePaginator from './paginator';

const Employees = ({token}) => {

    const [employees, setEmployees] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(0);

    const initialState ={
        name:'',
        sex:'',
        birthday:'',
        contacts:'',
        position:'',
        salary:0
    };

    const { handleChange, handleReset, handleSubmit, setValues, values, errors } = UseValidationForm(
        submit,
        initialState,
        Validation
    );

    const [btnTitle, setBtnTitle] = useState(null);
    const [title, setTitle] = useState('');
    const [editEmployeeId, setEditEmployeeId] = useState('');
    const [modal, setModal] = useState(false);

    const toggleModal = () =>{
        if(modal){
            handleReset();
        }
        setModal(!modal);
    } 

    const [pages, setPages] = useState(0);
    const {elPaginate, elLimite, page, limit} = UsePaginator(pages);

    useEffect(() => {
        if(page===0){
            return;
        }

        let isCurrent = true;

        getEmployees()
        .then((res) =>{
            if(isCurrent){
                parseData(res.data);
            }
        })
        .catch((err) => {
            if(isCurrent){
                console.error(err);
            }
        });

        return ()=>{isCurrent = false}
    }, [page,limit,needUpdate]);

    const parseData=(data)=>{
        setPages(data.pages);
        setEmployees(data.docs);
    };

    const getEmployees = ()=>{
        return axios({
            method: 'get',
            url: `http://localhost:5000/employees/?page=${page}&limit=${limit}`,
            headers:{'Authorization':token}
        })
        .then((res) => res)
        .catch((err) => Promise.reject(err));
    }

    // POST
    const addEmployee = () => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/employees/create',
            headers:{'Authorization':token},
            data: values
        })
        .then((res) => {
            setNeedUpdate(needUpdate+1);
            toggleModal();
        })
        .catch((err)=>{
            console.error(err);
            if (err.response) {
                console.log(err.response.data);
            }
        });
    };

    // PUT
    const updateEmployee = () => {
        axios({
            method: 'put',
            url: `http://localhost:5000/employees/update/${editEmployeeId}`,
            headers: {'Authorization':token},
            data: values
        })
        .then((res) => {
            setNeedUpdate(needUpdate+1);
            toggleModal();
        })
        .catch((err)=>{
            console.error(err);
            if (err.response) {
                console.log(err.response.data);
            }
        });
    };

    // DELETE
    const removeEmployee = (_id) => {
        axios({
            method: 'delete',
            url: `http://localhost:5000/employees/delete/${_id}`,
            headers: {'Authorization':token}
        })
        .then(() => {
            setNeedUpdate(needUpdate+1);
        })
        .catch((err)=>{
            console.error(err);
            if (err.response) {
                console.log(err.response.data);
            }
        });
    };

    const openAddModal = ()=>{
        setTitle('Add form');
        setBtnTitle('Add');
        setModal(true);
    }

    const openEditModal = (employee)=>{
        setEditEmployeeId(employee._id);

        const vals = {};
        for(let key in initialState){
            vals[key] = employee[key];
        }

        setValues(vals);
        setTitle('Edit form');
        setBtnTitle('Update');
        setModal(true);
    }

    function submit(){
        if(btnTitle==='Add'){
            addEmployee();
        }else{
            updateEmployee();
        }
    }

    return (
        <div>
            <h1>Employees List</h1>

            <Button className='my-3' color='success' onClick={openAddModal}>ADD EMPLOYEE</Button>
            <ModalEmployees
                modal={modal} 
                toggleModal={toggleModal}
                handleChange={handleChange}
                handleModalSubmit={handleSubmit}
                title={title}
                btnTitle={btnTitle} 
                values={values}
                errors={errors}
            />
            <div>
                { elLimite }
                { elPaginate }
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Sex</th>
                            <th>Birthday</th>
                            <th>Contacts</th>
                            <th>Position</th>
                            <th>Salary</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee.name}</td>
                                <td>{employee.sex}</td>
                                <td>{employee.birthday}</td>
                                <td>{employee.contacts}</td>
                                <td>{employee.position}</td>
                                <td>{employee.salary}</td>
                                <td>
                                    <Button color='success' size='sm' className='mr-2' onClick={() => { openEditModal(employee) }}>EDIT</Button>
                                    <Button color='danger' size='sm' onClick={() => { removeEmployee(employee._id) }}>DELETE</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                { elPaginate }
            </div>
        </div>
    );
};

export default Employees;
