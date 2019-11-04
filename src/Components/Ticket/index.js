import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';

import axios from 'axios';

import Header from '../Header';
import TicketList from './list';

import './index.scss';

/**
 * @class
 * @name Ticket
 * @extends Component
 * @description Ticket Component mounts at `/` route
 */
class TicketComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { match } = this.props;
        return (
            <Fragment>
                <Header />
                <Route exact path={`${ match.path }/`} component={TicketList} />
            </Fragment>
        );
    }
}

export default TicketComponent;
