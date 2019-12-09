import React, { Component, Fragment } from 'react';

import './index.scss';

/*
 * @class
 * @name dashboard
 * @extends Component
 * @description Dashboard Component mounts at `/` route */

class Dashboard extends Component {
    /*
      * @memberof Dashboard
      * @function
      * @name constructor
      * @description initialises the component
      * @param { Object } props - component property */

    constructor(props) {
        super(props);
        this.state = {};
        console.log('dash, this.props');
    }

    /*
      * @memberof Dashboard
      * @function
      * @name render
      * @description renders html
      * @returns {HTMLDOM} html dom */

    render() {
        return (
            <Fragment>
                <section className="content-header">
                    <h1>
                         Dashboard
                        <small>Contol panel</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li>
                            <a href="#">
                                <i className="fa fa-dashboard"/>
                            </a>
                        </li>
                        <li className="active">Dashboard</li>
                    </ol>

                </section>
            </Fragment>
        );
    }
}
export default Dashboard;

