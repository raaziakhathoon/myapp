import React, { Component, Fragment } from 'react';
import axios from 'axios';

import Header from '../Header';

import './index.scss';

/**
 * @class
 * @name Login
 * @extends Component
 * @description Login Component mounts at `/` route
 */
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Fragment>
                <Header />
                <section id="main-content" className=" ">
                    <section className="wrapper main-wrapper row">
                        <div className="col-xs-12">
                            <section className="box ">
                                <div className="content-body">
                                    <div className="row">
                                        <div className="col-lg-1">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="test">
                                                  Ticket No
                                                </label>
                                                <div className="controls">
                                                    <input type="text" className="form-control" name="permitNo" onChange={(e) => { this.handleInputChange(e.target.value, 'permitNo'); }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="test">
                                                  Plate No
                                                </label>
                                                <div className="controls">
                                                    <input type="text" className="form-control" name="permitNo" onChange={(e) => { this.handleInputChange(e.target.value, 'permitNo'); }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="test">
                                                  Space No
                                                </label>
                                                <div className="controls">
                                                    <input type="text" className="form-control" name="permitNo" onChange={(e) => { this.handleInputChange(e.target.value, 'permitNo'); }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="test">
                                                  Vehicle Make
                                                </label>
                                                <div className="controls">
                                                    <input type="text" className="form-control" name="permitNo" onChange={(e) => { this.handleInputChange(e.target.value, 'permitNo'); }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="test">
                                                  Vehicle Color
                                                </label>
                                                <div className="controls">
                                                    <input type="text" className="form-control" name="permitNo" onChange={(e) => { this.handleInputChange(e.target.value, 'permitNo'); }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="test">
                                                  Vpa In
                                                </label>
                                                <div className="controls">
                                                    <input type="text" className="form-control" name="permitNo" onChange={(e) => { this.handleInputChange(e.target.value, 'permitNo'); }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="test">
                                                  City
                                                </label>
                                                <div className="controls">
                                                    <input type="text" className="form-control" name="permitNo" onChange={(e) => { this.handleInputChange(e.target.value, 'permitNo'); }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="test">
                                                  Commends
                                                </label>
                                                <div className="controls">
                                                    <input type="text" className="form-control" name="permitNo" onChange={(e) => { this.handleInputChange(e.target.value, 'permitNo'); }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </section>
                </section>
            </Fragment>
        );
    }
}

export default Dashboard;
