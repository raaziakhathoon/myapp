import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthenticatedGaurd from './Guards/Authenticated.Gaurd';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={
            (props) => {
                if (AuthenticatedGaurd.state(props)) {
                    return <Component {...props} />;
                }
                return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
            }
        }
    />
);

export default AuthenticatedRoute;
