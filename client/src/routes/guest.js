import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const GuestRoute = ({ children, ...rest })=> {
    return (
        <Route
            {...rest}
            render={({ location }) => (
                !rest.isLoading
                    ?
                    (
                        !rest.isAuthenticated
                            ?
                            children
                            :
                            <Redirect
                                to={{
                                    pathname: "/",
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

export default GuestRoute;