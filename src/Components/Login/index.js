import React, { Component } from 'react';
import axios from 'axios';

import './login.scss';

/**
 * @class
 * @name Login
 * @extends Component
 * @description Login Component mounts at `/` route
 */
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    handleChange(e) {
        this.setState(prevState => ({
            ...prevState,
            [ e.target.name ]: e.target.value,
        }));
        e.persist();
    }

    async doLogin() {
        const { history } = this.props;
        const { data } = await axios.post(`${ process.env.API_URI }/login`, { ...this.state });
        sessionStorage.setItem('access_token', data.token);
        if (data.token) {
            history.push('/dashboard');
        }
    }

    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <span className="login100-form-logo">
                            <i className="zmdi zmdi-landscape" />
                        </span>
                        <span className="login100-form-title p-b-34 p-t-27">Log in</span>
                        <div className="wrap-input100 validate-input" data-validate="Enter username">
                            <input className="input100" type="text" name="username" placeholder="Username" onChange={e => this.handleChange(e)} />
                            <span className="focus-input100" data-placeholder="&#xf207;" />
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Enter password">
                            <input className="input100" type="password" name="password" placeholder="Password" onChange={e => this.handleChange(e)} />
                            <span className="focus-input100" data-placeholder="&#xf191;" />
                        </div>

                        <div className="contact100-form-checkbox">
                            <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                            <label className="label-checkbox100" htmlFor="ckb1">
                                    Remember me
                            </label>
                        </div>

                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn" onClick={() => this.doLogin()}>Login</button>
                        </div>

                        <div className="text-center p-t-90">
                            <a className="txt1" href="#">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
