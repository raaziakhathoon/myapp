import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import axios from 'axios';

import './index.scss';

/**
 * @class
 * @name Driver
 * @extends Component
 * @description Driver Component mounts at `/` route
 */
class DriverComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            driverList: [],
            driverNo: '',
            firstName: '',
            lastName: '',
            mobileNo: '',
            dob: '',
            nationality: '',
        };
    }

    async componentDidMount() {
        const { data } = await axios.get(`${ process.env.API_URI }/driver`);
        this.setState({
            driverList: data,

        });
    }

    // eslint-disable-next-line class-methods-use-this
    // eslint-disable-next-line react/sort-comp
    renderColumn() {
        return ([
            {
                Header: 'Driver No',
                accessor: 'driverNo',
            },
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
                Header: 'DOB',
                accessor: 'dob',
            },
            {
                Header: 'Nationality',
                accessor: 'nationality',
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
        const { driverList } = this.state;
        return driverList.map(e => ({
            driverNo: e.driverNo,
            firstName: e.firstName,
            lastName: e.lastName,
            mobileNo: e.mobileNo,
            dob: e.dob,
            nationality: e.nationality,
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
    handleCreateDriver() {
        window.$('#driverCreate').modal('show');
    }

    // eslint-disable-next-line class-methods-use-this
    handleCloseModel() {
        this.setState({
            driverName: '',
        });
        window.$('#driverCreate').modal('hide');
    }

    async handleSubmit() {
        await axios.post(`${ process.env.API_URI }/driver`, { ...this.state });
        const { data } = await axios.get(`${ process.env.API_URI }/driver`);
        this.setState({
            driverList: data,
        });
        window.$('#driverCreate').modal('hide');    
    }

    renderModel() {
        const { driverNo, firstName, lastName, mobileNo, dob, nationality } = this.state;
        // xl / sm /  md /
        return (
            <div className="modal fade" id="driverCreate" tabIndex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="createDriver" aria-hidden="true">
                <div className="modal-dialog modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create Driver</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => { this.handleCloseModel(); }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label">Driver No</label>
                                        <div className="controls">
                                            <input type="text" className="form-control" name="driverNo" value={driverNo} onChange={(e) => { this.handleChange('driverNo', e); }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label">First Name</label>
                                        <div className="controls">
                                            <input type="text" className="form-control" name="firstName" value={firstName} onChange={(e) => { this.handleChange('firstName', e); }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label">Last Name</label>
                                        <div className="controls">
                                            <input type="text" className="form-control" name="lastName" value={lastName} onChange={(e) => { this.handleChange('lastName', e); }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label">Mobile NO</label>
                                        <div className="controls">
                                            <input type="text" className="form-control" name="mobileNo" value={mobileNo} onChange={(e) => { this.handleChange('mobileNo', e); }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label">DOB</label>
                                        <div className="controls">
                                            <input type="text" className="form-control" name="dob" value={dob} onChange={(e) => { this.handleChange('dob', e); }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label">Nationality</label>
                                        <div className="controls">
                                            <input type="text" className="form-control" name="nationality" value={nationality} onChange={(e) => { this.handleChange('nationality', e); }} />
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
                        <h2 className="title pull-left">Driver</h2>
                        <div className="actions panel_actions pull-right">
                            <button type="submit" className="btn btn-success" onClick={() => { this.handleCreateDriver(); }}>Add Driver</button>
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

export default DriverComponent;
