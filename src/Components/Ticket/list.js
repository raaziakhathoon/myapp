import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import axios from 'axios';

import './index.scss';

/**
 * @class
 * @name Ticket
 * @extends Component
 * @description Ticket Component mounts at `/` route
 */
class TicketComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketList: [],
            ticketNo: '',
            status: '',
            ticketStatus: '',
            isReusable: '',
            isUsed: '',
        };
    }

    async componentDidMount() {
        const { data } = await axios.get(`${ process.env.API_URI }/ticket`);
        this.setState({
            ticketList: data,
        });
    }

    // eslint-disable-next-line class-methods-use-this
    // eslint-disable-next-line react/sort-comp
    renderColumn() {
        return ([
            {
                Header: 'Ticket No',
                accessor: 'ticketNo',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Ticket Status',
                accessor: 'ticketStatus',
            },
            {
                Header: 'Is Reusable',
                accessor: 'isReusable',
            },
            {
                Header: 'Is Used',
                accessor: 'isUsed',
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
        const { ticketList } = this.state;
        return ticketList.map(e => ({
            ticketNo: e.ticketNo,
            status: e.status,
            ticketStatus: e.ticketStatus,
            isReusable: e.isReusable,
            isUsed: e.isUsed,
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
    handleCreateticket() {
        window.$('#ticketCreate').modal('show');
    }

    // eslint-disable-next-line class-methods-use-this
    handleCloseModel() {
        this.setState({
            ticketNo: '',
        });
        window.$('#ticketCreate').modal('hide');
    }

    async handleSubmit() {
        const { ticketName } = this.state;
        // eslint-disable-next-line no-console
        console.log('Ticket: ', ticketName);

        await axios.post(`${ process.env.API_URI }/ticket`, { ...this.state });
        const { data } = await axios.get(`${ process.env.API_URI }/ticket`);
        this.setState({
            ticketList: data,
        });
        window.$('#ticketCreate').modal('hide');
    }

    renderModel() {
        const { ticketNo, status, ticketStatus, isReusable, isUsed } = this.state;
        // xl / sm /  md /
        return (
            <div className="modal fade" id="ticketCreate" tabIndex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="createTicket" aria-hidden="true">
                <div className="modal-dialog modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create Ticket</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => { this.handleCloseModel(); }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="form-label">Ticket No</label>
                                            <div className="controls">
                                                <input type="text" className="form-control" name="ticketNo" value={ticketNo} onChange={(e) => { this.handleChange('ticketNo', e); }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="form-label">Status</label>
                                            <div className="controls">
                                                <input type="text" className="form-control" name="status" value={status} onChange={(e) => { this.handleChange('status', e); }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="form-label">ticket Status </label>
                                            <div className="controls">
                                                <input type="text" className="form-control" name="ticketStatus" value={ticketStatus} onChange={(e) => { this.handleChange('ticketStatus', e); }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="form-label">Is Reusable</label>
                                            <div className="controls">
                                                <input type="text" className="form-control" name="isReusable" value={isReusable} onChange={(e) => { this.handleChange('isReusable', e); }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="form-label">Is Used</label>
                                            <div className="controls">
                                                <input type="text" className="form-control" name="isUsed" value={isUsed} onChange={(e) => { this.handleChange('isUsed', e); }} />
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
            </div>
        );
    }

    render() {
        return (
            <div className="col-lg-12">
                <section className="box ">
                    <header className="panel_header">
                        <h2 className="title pull-left">Ticket</h2>
                        <div className="actions panel_actions pull-right">
                            <button type="submit" className="btn btn-success" onClick={() => { this.handleCreateticket(); }}>Add Ticket</button>
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

export default TicketComponent;

