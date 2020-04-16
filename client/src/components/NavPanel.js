import React,{ useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';

const NavPanel = ({isLogin, logOut}) => {

    const navStyle = {
        color: 'white'
    };

    const btnLogin = ()=>{
        return(
            <NavLink key="login" style={navStyle} to='/login'>
                <li>LogIn</li>
            </NavLink>
        );
    };

    const btnRegister = ()=>{
        return(
            <NavLink key="register" style={navStyle} to='/registration'>
                <li>Registration</li>
            </NavLink>
        );
    };

    const btnLogout = ()=>{
        return(
                <Button 
                    color="link" 
                    key="logout" 
                    style={navStyle} 
                    onClick={logOut}
                >logOut</Button>
        );
    };

    const btnEmployee = ()=>{
        return(
            <NavLink key="employee" style={navStyle} to='/employees'>
                <li>Employees</li>
            </NavLink>
        );
    };

    const [buttons, setButtons] = useState([]);

    useEffect(()=>{
        if(isLogin){
            setButtons([btnEmployee(),btnLogout()]);
        }else{
            setButtons([btnLogin(),btnRegister()]);
        }
    },[isLogin]);


    return (
        <nav>
            <h3>Project_KG</h3>
            <ul className='nav-links'>
                <NavLink style={navStyle} to='/about'>
                    <li>About</li>
                </NavLink>
                { buttons }
            </ul>
        </nav>
    );
};

export default NavPanel;