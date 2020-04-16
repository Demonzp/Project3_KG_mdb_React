import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({ children, ...rest })=> {
    return (
        <Route
            {...rest}
            render={({ location }) => (
                !rest.isLoading
                    ?
                    (
                        rest.isAuthenticated
                            ?
                            children
                            :
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: location }
                                }}
                            />
                    )
                    :
                    null
            )}
        />
    );
}

export default PrivateRoute;