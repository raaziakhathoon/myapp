import React, { Component } from 'react';
import axios from 'axios';
import './login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            error: '',
        };

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }

    dismissError() {
        this.setState({ error: '' });
    }

    handleSubmit(event) {
        // eslint-disable-next-line no-empty
        if (this.state.userName && this.state.password) {
        }
    }

    handleUserChange(event) {
        this.setState({
            userName: event.target.value,
        });
    }

    handlePassChange(event) {
        this.setState({
            password: event.target.value,
        });
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
        const { userName, password } = this.state;
        return (
            <div className="Login">
        
                <label center>UserName</label>
                <input type="text" data-test="username" bsSize="large" value={userName} onChange={this.handleUserChange} />
        
                <label center>Password</label>
                <input type="password" data-test="password" bsSize="large" value={password} onChange={this.handlePassChange} />


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
        );
    }
}

export default Login;
