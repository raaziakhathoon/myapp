import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import axios from 'axios';

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
        this.state = {
            userList: [],
            firstName: '',
            lastName: '',
            mobileNo: '',
            email: '',
            password: '',
            userName: '',
        };
    }

    async componentDidMount() {
        const { data } = await axios.get(`${ process.env.API_URI }/user`);
        this.setState({
            userList: data,
        });
    }

    // eslint-disable-next-line class-methods-use-this
    // eslint-disable-next-line react/sort-comp
    renderColumn() {
        return ([
            {
                Header: 'First Name',
                accessor: 'firstName',
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
            },
            {
                Header: 'Mobile No',
                accessor: 'mobileNo',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Password',
                accessor: 'password',
            },
            {
                Header: 'User Name',
                accessor: 'userName',
            },
            {
                Header: 'Action',
                accessor: 'action',
                width: 100,
                Cell: ({ row }) => (<button data-toggle="modal" data-target="#updateModel" onClick={() => this.handleButtonClick(row)}>Edit</button>),
            },
        ]);
    }

    renderTableData() {
        const { userList } = this.state;
        return userList.map(e => ({
            firstName: e.firstName,
            lastName: e.lastName,
            mobileNo: e.mobileNo,
            email: e.email,
            password: e.password,
            userName: e.userName,
            action: e._id,
        }));
    }

    renderTable() {
        const rows = this.renderTableData();

        return (
            <ReactTable
                className="-striped -highlight"
                columns={[{ Header: '', columns: this.renderColumn() }]}
                noDataText="No Record Found"
                data={rows}
                showPageSizeOptions
                showPagination
            />
        );
    }

    handleChange(fieldName, e) {
        this.setState(prevState => ({
            ...prevState,
            [ fieldName ]: e.target.value,
        }));
        e.persist();
    }

    // eslint-disable-next-line class-methods-use-this
    handleCreateuser() {
        window.$('#userCreate').modal('show');
    }

    // eslint-disable-next-line class-methods-use-this
    handleCloseModel() {
        this.setState({
            userName: '',
        });
        window.$('#userCreate').modal('hide');
    }

    async handleSubmit() {
        const { userName } = this.state;
        // eslint-disable-next-line no-console
        console.log('user: ', userName);

        await axios.post(`${ process.env.API_URI }/user`, { ...this.state });
        const { data } = await axios.get(`${ process.env.API_URI }/user`);
        this.setState({
            userList: data,
        });
        window.$('#userCreate').modal('hide');
    }

    renderModel() {
        const { 
            firstName, lastName, mobileNo, email, password, userName,
        } = this.state;
        // xl / sm /  md /
        return (
            <div className="modal fade" id="userCreate" tabIndex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="createuser" aria-hidden="true">
                <div className="modal-dialog modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create User</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => { this.handleCloseModel(); }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label">First Name</label>
                                        <div className="controls">
                                            <input type="text" className="form-control" name="firstName" value={firstName} onChange={(e) => { this.handleChange('firstName', e); }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label">Last Name</label>
                                        <div className="controls">
                                            <input type="text" className="form-control" name="lastName" value={lastName} onChange={(e) => { this.handleChange('lastName', e); }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label">Mobile No</label>
                                        <div className="controls">
                                            <input type="text" className="form-control" name="mobileNo" value={mobileNo} onChange={(e) => { this.handleChange('mobileNo', e); }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label">Email</label>
                                        <div className="controls">
                                            <input type="text" className="form-control" name="email" value={email} onChange={(e) => { this.handleChange('email', e); }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label">Password</label>
                                        <div className="controls">
                                            <input type="text" className="form-control" name="password" value={password} onChange={(e) => { this.handleChange('password', e); }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label">User Name</label>
                                        <div className="controls">
                                            <input type="text" className="form-control" name="userName" value={userName} onChange={(e) => { this.handleChange('userName', e); }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={() => this.handleSubmit()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="col-lg-12">
                <section className="box ">
                    <header className="panel_header">
                        <h2 className="title pull-left">User</h2>
                        <div className="actions panel_actions pull-right">
                            <button type="submit" className="btn btn-success" onClick={() => { this.handleCreateuser(); }}>Add User</button>
                        </div>
                    </header>
                </section>
                <section className="box ">
                    <header className="panel_header">
                        <h2 className="title pull-left">&nbsp;</h2>
                    </header>
                    <div className="content-body">
                        <div className="row">
                            <div className="col-md-12">

                                {
                                    this.renderTable()
                                }
                                {
                                    this.renderModel()
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default UserComponent;
