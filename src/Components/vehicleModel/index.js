import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';

import axios from 'axios';

import Header from '../Header';
import vehicleModelList from './list';

import './index.scss';

/**
 * @class
 * @name vehicleModel
 * @extends Component
 * @description vehicleModel Component mounts at `/` route
 */
class vehicleModelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { match } = this.props;
        return (
            <Fragment>
                <Header />
                <Route exact path={`${ match.path }/`} component={vehicleModelList} />
            </Fragment>
        );
    }
}

export default vehicleModelComponent;
