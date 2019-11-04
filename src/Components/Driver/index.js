import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';

import axios from 'axios';

import Header from '../Header';
import DriverList from './list';

import './index.scss';

/**
 * @class
 * @name Driver
 * @extends Component
 * @description Driver Component mounts at `/` route
 */
class DriverComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { match } = this.props;
        return (
            <Fragment>
                <Header />
                <Route exact path={`${ match.path }/`} component={DriverList} />
            </Fragment>
        );
    }
}

export default DriverComponent;
