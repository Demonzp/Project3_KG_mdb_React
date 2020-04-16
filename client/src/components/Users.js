import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

const Users = () => {

    const [users, setUsers] = useState([]);

    const [userLogin, setUserLogin] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [editUserId, setEditUserId] = useState('');
    const [editUserLogin, setEditUserLogin] = useState('');
    const [editUserEmail, setEditUserEmail] = useState('');
    const [editUserPassword, setEditUserPassword] = useState('');

    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const toggleAddModal = () => setAddModal(!addModal);
    const toggleEditModal = () => setEditModal(!editModal);

    useEffect(() => {
        getUsers();
    }, []);

    // GET
    const getUsers = () => {
        axios.get('http://localhost:5000/users/')
            .then((res) => setUsers(res.data))
            .catch((err) => console.error(err));
    };

    // POST
    const addUser = () => {
        axios.post('http://localhost:5000/users/create', {
            login: userLogin,
            email: userEmail,
            password: userPassword,
        })
            .then((res) => {
                const newArr = [
                    ...users,
                    {
                        ...res.data
                    }
                ];

                setUsers(newArr);
                toggleAddModal();
            })
            .catch((err) => console.error(err));
    };

    // PUT
    const updateUser = () => {
        axios.put('http://localhost:5000/users/update/' + editUserId, {
            login: editUserLogin,
            email: editUserEmail,
            password: editUserPassword,
        })
            .then(() => {
                const idx = users.findIndex((el) => el._id === editUserId);
                const oldItem = users[idx];

                const newItem = {
                    ...oldItem,
                    login: editUserLogin,
                    email: editUserEmail,
                    password: editUserPassword,
                };

                const newArr = [
                    ...users.slice(0, idx),
                    newItem,
                    ...users.slice(idx + 1)
                ];

                setUsers(newArr);
                toggleEditModal();
            })
            .catch((err) => console.error(err));
    };

    const editUser = (_id) => {
        const user = users.find((el) => el._id === _id);
        setEditUserId(_id);
        setEditUserLogin(user.login);
        setEditUserEmail(user.email);
        setEditUserPassword(user.password);

        toggleEditModal();
    };

    // DELETE
    const removeUser = (_id) => {
        axios.delete('http://localhost:5000/users/delete/' + _id)
            .then(() => {
                const idx = users.findIndex((el) => el._id === _id);

                const newArr = [
                    ...users.slice(0, idx),
                    ...users.slice(idx + 1)
                ];

                setUsers(newArr);
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <h1>Users List</h1>

            <Button className='my-3' color='success' onClick={toggleAddModal}>ADD USER</Button>
            <Modal isOpen={addModal} toggle={toggleAddModal}>
                <ModalHeader toggle={toggleAddModal}>Add new user</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for='login'>Login</Label>
                        <Input id='login' value={userLogin} onChange={(e) => { setUserLogin(e.target.value) }} />
                        <br />
                        <Label for='email'>Email</Label>
                        <Input id='email' value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} />
                        <br />
                        <Label for='password'>Password</Label>
                        <Input id='password' value={userPassword} onChange={(e) => { setUserPassword(e.target.value) }} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={addUser}>ADD</Button>{' '}
                    <Button color='secondary' onClick={toggleAddModal}>CANCEL</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={editModal} toggle={toggleEditModal}>
                <ModalHeader toggle={toggleEditModal}>Edit user info</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for='login'>Login</Label>
                        <Input id='login' value={editUserLogin} onChange={(e) => { setEditUserLogin(e.target.value) }} />
                        <br />
                        <Label for='email'>Email</Label>
                        <Input id='email' value={editUserEmail} onChange={(e) => { setEditUserEmail(e.target.value) }} />
                        <br />
                        <Label for='password'>Password</Label>
                        <Input id='password' value={editUserPassword} onChange={(e) => { setEditUserPassword(e.target.value) }} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={updateUser}>ADD</Button>{' '}
                    <Button color='secondary' onClick={toggleEditModal}>CANCEL</Button>
                </ModalFooter>
            </Modal>

            <Table>
                <thead>
                    <tr>
                        <th>Login</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.login}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>
                                <Button color='success' size='sm' className='mr-2' onClick={() => { editUser(user._id) }}>EDIT</Button>
                                <Button color='danger' size='sm' onClick={() => { removeUser(user._id) }}>DELETE</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Users;