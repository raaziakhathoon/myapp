import React from 'react';
import ReactDOM from 'react-dom';

import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AnonymousRoute from './CustomRoute/AnonymousRoute';
import AuthenticatedRoute from './CustomRoute/Authenticated.Route';

import Store from '@/ReduxStore';
import LoginComponent from '@/Components/Login';

import '@/app.scss';

const App = () => (
    <BrowserRouter>
        <AnonymousRoute exact path="/" authenticated={typeof authenticated !== 'undefined'} component={LoginComponent} />
        {/* <AuthenticatedRoute path="/dashboard" component={DashboardComponent} /> */}
    </BrowserRouter>
);

ReactDOM.render(<Provider store={Store}><App /></Provider>, document.getElementById('app'));
