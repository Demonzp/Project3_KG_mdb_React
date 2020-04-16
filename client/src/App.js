import React,{ useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import About from './components/About'
import Employees from './components/Employees';
import Login from './components/Login';
import NavPanel from './components/NavPanel';
import Registration from './components/Registration';
import { GuestRoute, PrivateRoute } from './routes';

function App() {
    const [is_login, setIsLogin] = useState(false);
    const [is_loading, setIsLoading] = useState(true);
    const [token, setToken] = useState(null);

    useEffect(()=>{
        if(localStorage.hasOwnProperty('token')){
            auth(localStorage.getItem('token'));
        }
        setIsLoading(false);
    },[]);

    const auth = (token)=>{
        if(typeof token==="string"){
            setIsLogin(true);
            localStorage.setItem('token', token);
            setToken(token);
        }else{
            localStorage.removeItem('token');
            setIsLogin(false);
            setToken(null);
        }
    };


    return (
        <Router>
            <div className="App">
                <NavPanel 
                    logOut={auth}
                    isLogin={is_login}
                />
                    <Route path="/"
                        render={() => <h2>Project_KG_mdb_React</h2>}
                        exact
                    />
                    <Route path='/about' component={About} />
                    <GuestRoute path="/login" isLoading={is_loading} isAuthenticated={is_login}>
                            <Login auth={auth}/>
                    </GuestRoute>
                    <PrivateRoute path="/employees" isLoading={is_loading} isAuthenticated={is_login}>
                            <Employees token={token}/>
                    </PrivateRoute>
                    <GuestRoute path="/registration" isLoading={is_loading} isAuthenticated={is_login}>
                            <Registration/>
                    </GuestRoute>
            </div>
        </Router>
    );
}

export default App;
