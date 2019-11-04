import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';

import axios from 'axios';

import Header from '../Header';
import CityList from './list';

import './index.scss';

/**
 * @class
 * @name City
 * @extends Component
 * @description City Component mounts at `/` route
 */
class CityComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { match } = this.props;
        return (
            <Fragment>
                <Header />
                <Route exact path={`${ match.path }/`} component={CityList} />
            </Fragment>
        );
    }
}

export default CityComponent;
