import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';

import axios from 'axios';

import Header from '../Header';
import UserList from './list';

import './index.scss';

/**
 * @class
 * @name User
 * @extends Component
 * @description User Component mounts at `/` route
 */
class UserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { match } = this.props;
        return (
            <Fragment>
                <Header />
                <Route exact path={`${ match.path }/`} component={UserList} />
            </Fragment>
        );
    }
}

export default UserComponent;