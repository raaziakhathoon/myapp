import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';

import axios from 'axios';

import Header from '../Header';
import vehicleMakeList from './list';

import './index.scss';

/**
 * @class
 * @name vehicleMake
 * @extends Component
 * @description vehicleMake Component mounts at `/` route
 */
class vehicleMakeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { match } = this.props;
        return (
            <Fragment>
                <Header />
                <Route exact path={`${ match.path }/`} component={vehicleMakeList} />
            </Fragment>
        );
    }
}

export default vehicleMakeComponent;
