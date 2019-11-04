import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';

import axios from 'axios';

import Header from '../Header';
import vehicleColorList from './list';

import './index.scss';

/**
 * @class
 * @name vehicleColor
 * @extends Component
 * @description vehicleColor Component mounts at `/` route
 */
class vehicleColorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { match } = this.props;
        return (
            <Fragment>
                <Header />
                <Route exact path={`${ match.path }/`} component={vehicleColorList} />
            </Fragment>
        );
    }
}

export default vehicleColorComponent;
