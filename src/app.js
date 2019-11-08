import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AnonymousRoute from './CustomRoute/AnonymousRoute';
import AuthenticatedRoute from './CustomRoute/Authenticated.Route';

import Store from '@/ReduxStore';
import LoginComponent from '@/Components/Login';
import DashboardComponent from '@/Components/Dashboard';
import CityComponent from '@/Components/City';
import vehicleColorComponent from '@/Components/vehicleColor';
import vehicleMakeComponent from '@/Components/vehicleMake';
import vehicleModelComponent from '@/Components/vehicleModel';
import DriverComponent from '@/Components/Driver';
import TicketComponent from '@/Components/Ticket';
import UserComponent from '@/Components/User';

import '@/app.scss';

const App = () => (
    <BrowserRouter>
        <Fragment>
            <AnonymousRoute exact path="/" authenticated={typeof authenticated !== 'undefined'} component={LoginComponent} />
            <AuthenticatedRoute path="/dashboard" component={DashboardComponent} />
            <AuthenticatedRoute path="/city" component={CityComponent} />
            <AuthenticatedRoute path="/vehicleColor" component={vehicleColorComponent} />
            <AuthenticatedRoute path="/vehicleMake" component={vehicleMakeComponent} />
            <AuthenticatedRoute path="/vehicleModel" component={vehicleModelComponent} />
            <AuthenticatedRoute path="/driver" component={DriverComponent} />
            <AuthenticatedRoute path="/ticket" component={TicketComponent} />
            <AuthenticatedRoute path="/user" component={UserComponent} />
        </Fragment>
    </BrowserRouter>
);

ReactDOM.render(<Provider store={Store}><App /></Provider>, document.getElementById('app'));
