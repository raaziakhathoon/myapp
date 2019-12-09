/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import './index.scss';

/**
 * @class
 * @name Header
 * @extends Component
 * @description Header Component mounts at `/` route
 */
@withRouter
class Header extends Component {
    /**
     * @memberof Header
     * @function
     * @name constructor
     * @description intialises the component
     * @param { Object } props - component property
     */
    constructor(props) {
        super(props);
        this.state = {
            user: '',
        };
    }

    async doLogout() {
        const { history } = this.props;
        const sessionId = sessionStorage.getItem('access_token');
        const { data } = await axios.post(`${ process.env.API_URI }/logout`, { sessionId });
        if (!data.error) {
            sessionStorage.removeItem('access_token');
            history.push('/');
        }
    }

    /**
     * @memberof Header
     * @function
     * @name render
     * @description renders html
     * @returns {HTMLDOM} html dom
     */
    // eslint-disable-next-line complexity
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Master
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="/vehicleColor">Form</Link>
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav my-2 my-lg-0" style={{ cursor: 'pointer' }}>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-user" />
                                    Raazia
                            </a>
                            <div className="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
                                <a className="dropdown-item" href="#">My account</a>
                                <a className="dropdown-item" href="#" onClick={() => this.doLogout()}>Log out</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
