import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import axios from 'axios';

import Header from '../Header';

import './index.scss';

/**
 * @class
 * @name Dashboard
 * @extends Component
 * @description Dashboard Component mounts at `/` route
 */
class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parkingVehicleList: [],
            requestedList: [],
            onthewayList: [],
            parkingId: '',
            ticketNo: '',
            plateNo: '',
            spaceNo: '',
            vehicleMake: '',
            vehicleColor: '',
            vpaIn: '',
            vpaOut: '',
            city: '',
            commends: '',
        };
    }

    componentDidMount() {
        this.getList();
    }

    getList() {
        this.getParkingList();
        this.getRequestedList();
        this.getOnthewayList();
    }

    async getParkingList() {
        const { data } = await axios.get(`${ process.env.API_URI }/parkingVehicle/all`, {
            headers: {
                authorization: `Bearer ${ sessionStorage.getItem('access_token') }`,
            },
        });
        this.setState({
            parkingVehicleList: data,
        });
    }

    async getRequestedList() {
        const { data } = await axios.get(`${ process.env.API_URI }/parkingVehicle/Requested`, {
            headers: {
                authorization: `Bearer ${ sessionStorage.getItem('access_token') }`,
            },
        });
        this.setState({
            requestedList: data,
        });
    }

    async getOnthewayList() {
        const { data } = await axios.get(`${ process.env.API_URI }/parkingVehicle/Ontheway`, {
            headers: {
                authorization: `Bearer ${ sessionStorage.getItem('access_token') }`,
            },
        });
        this.setState({
            onthewayList: data,
        });
    }

    handleChange(fieldName, e) {
        this.setState(prevState => ({
            ...prevState,
            [ fieldName ]: e.target.value,
        }));
        e.persist();
    }

    // eslint-disable-next-line class-methods-use-this
    handleCreateDashboard() {
        window.$('#dashboardCreate').modal('show');
    }

    // eslint-disable-next-line class-methods-use-this
    handleCloseModel() {
        this.setState({
            parkingVehicle: '',
        });
        window.$('#dashboardCreate').modal('hide');
    }

    async handleSubmit() {
        const {
            ticketNo,
            vehicleColor,
            vehicleMake,
            plateNo,
            spaceNo,
            vpaIn,
            city,
            commends,
        } = this.state;
        // eslint-disable-next-line no-console

        await axios.post(`${ process.env.API_URI }/parkingVehicle`, {
            ticketNo,
            vehicleColor,
            vehicleMake,
            plateNo,
            spaceNo,
            vpaIn,
            city,
            commends,
            status: 'Received',
        }, {
            headers: {
                authorization: `Bearer ${ sessionStorage.getItem('access_token') }`,
            },
        });
        const { data } = await axios.get(`${ process.env.API_URI }/parkingVehicle/all`, {
            headers: {
                authorization: `Bearer ${ sessionStorage.getItem('access_token') }`,
            },
        });
        this.setState({
            ticketNo: '',
            vehicleColor: '',
            vehicleMake: '',
            plateNo: '',
            spaceNo: '',
            vpaIn: '',
            city: '',
            commends: '',
            parkingVehicleList: data,
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async checkTicketExists(ticket) {
        const { data } = await axios.post(`${ process.env.API_URI }/parkingVehicle/ticket`, {
            ticketNo: ticket,
        }, {
            headers: {
                authorization: `Bearer ${ sessionStorage.getItem('access_token') }`,
            },
        });
        return data;
    }

    async handleTicketNo(e) {
        this.setState(prevState => ({
            ...prevState,
            ticketNo: e.target.value,
        }));
        e.persist();
        const ticketNo = e.target.value;
        if (ticketNo.length === 8) {
            const ticket = await this.checkTicketExists(ticketNo);
            if (ticket) {
                this.setState({
                    parkingId: ticket._id,
                });
                if (ticket.status === 'Received') {
                    window.$('#requestedUpdate').modal('show');
                } else if (ticket.status === 'Requested') {
                    this.handleOnthewaySubmit();
                } else if (ticket.status === 'Ontheway') {
                    this.handleDeliveredSubmit();
                }
                this.setState({
                    ticketNo: '',
                });
            } else {
                document.getElementById('plateNo').focus();
            }
        }
    }

    async handleRequestedSubmit() {
        const { vpaOut, parkingId } = this.state;
        await axios.post(`${ process.env.API_URI }/parkingVehicle/req/${ parkingId }`, {
            vpaOut,
        }, {
            headers: {
                authorization: `Bearer ${ sessionStorage.getItem('access_token') }`,
            },
        });
        window.$('#requestedUpdate').modal('hide');
        this.setState({
            vpaOut: '',
        });
        this.getList();
    }

    async handleDeliveredSubmit() {
        const { parkingId } = this.state;
        await axios.get(`${ process.env.API_URI }/parkingVehicle/delivered/${ parkingId }`, {
            headers: {
                authorization: `Bearer ${ sessionStorage.getItem('access_token') }`,
            },
        });
        this.getList();
    }

    async handleOnthewaySubmit() {
        const { parkingId } = this.state;
        await axios.get(`${ process.env.API_URI }/parkingVehicle/ontheway/${ parkingId }`, {
            headers: {
                authorization: `Bearer ${ sessionStorage.getItem('access_token') }`,
            },
        });
        this.getList();
    }

    renderRequestedModel() {
        const { vpaOut } = this.state;
        // xl / sm /  md /
        return (
            <div className="modal fade" id="requestedUpdate" tabIndex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="createvehicleModel" aria-hidden="true">
                <div className="modal-dialog modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Requested Model</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => { this.handleCloseModel(); }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label">Vpa Out</label>
                                        <div className="controls">
                                            <input type="text" className="form-control" name="vpaOut" value={vpaOut} onChange={(e) => { this.handleChange('vpaOut', e); }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={() => this.handleRequestedSubmit()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // eslint-disable-next-line class-methods-use-this
    renderRequestedColumn() {
        return ([
            {
                Header: 'Ticket No',
                accessor: 'ticketNo',
            },
            {
                Header: 'Requested Time',
                accessor: 'requestedTime',
            },
            {
                Header: 'Vpa Out',
                accessor: 'vpaOut',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
        ]);
    }

    // eslint-disable-next-line no-dupe-class-members
    renderTableRequestedData() {
        const { requestedList } = this.state;
        return requestedList.map(e => ({
            ticketNo: e.ticketNo,
            vpaOut: e.requestedTime,
            status: e.status,
        }));
    }

    renderRequestedTable() {
        const rows = this.renderTableRequestedData();

        return (
            <ReactTable
                className="-striped -highlight"
                columns={[{ Header: '', columns: this.renderRequestedColumn() }]}
                noDataText="No Record Found"
                data={rows}
                pageSize={5}
                showPageSizeOptions={false}
                showPagination
            />
        );
    }

    // eslint-disable-next-line class-methods-use-this
    renderOnthewayColumn() {
        return ([
            {
                Header: 'Ticket No',
                accessor: 'ticketNo',
            },
            {
                Header: 'Vpa Out Time',
                accessor: 'vpaOutTime',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
        ]);
    }

    // eslint-disable-next-line no-dupe-class-members
    renderTableOnthewayData() {
        const { onthewayList } = this.state;
        return onthewayList.map(e => ({
            ticketNo: e.ticketNo,
            vpaOutTime: e.vpaOutTime,
            status: e.status,
        }));
    }

    renderOnthewayTable() {
        const rows = this.renderTableOnthewayData();

        return (
            <ReactTable
                className="-striped -highlight"
                columns={[{ Header: '', columns: this.renderOnthewayColumn() }]}
                noDataText="No Record Found"
                data={rows}
                pageSize={5}
                showPageSizeOptions={false}
                showPagination
            />
        );
    }

    // eslint-disable-next-line class-methods-use-this
    renderParkingColumn() {
        return ([
            {
                Header: 'Ticket No',
                accessor: 'ticketNo',
            },
            {
                Header: 'Plate No',
                accessor: 'plateNo',
            },
            {
                Header: 'Space No',
                accessor: 'spaceNo',
            },
            {
                Header: 'Vpa In',
                accessor: 'vpaIn',
            },
            {
                Header: 'Vpa Out',
                accessor: 'vpaOut',
            },
            {
                Header: 'City',
                accessor: 'city',
            },
            {
                Header: 'Parking In Time',
                accessor: 'parkingInTime',
            },
            {
                Header: 'Parking Out Time',
                accessor: 'parkingOutTime',
            },
            {
                Header: 'Comments',
                accessor: 'commends',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
        ]);
    }

    // eslint-disable-next-line no-dupe-class-members
    renderTableData() {
        const { parkingVehicleList } = this.state;
        return parkingVehicleList.map(e => ({
            ticketNo: e.ticketNo,
            plateNo: e.plateNo,
            spaceNo: e.spaceNo,
            vehicleMake: e.vehicleMake,
            vehicleColor: e.vehicleColor,
            parkingInTime: e.parkingInTime,
            parkingOutTime: e.parkingOutTime,
            vpaIn: e.vpaIn,
            vpaOut: e.vpaOut,
            city: e.city,
            commends: e.commends,
            status: e.status,
        }));
    }

    renderTable() {
        const rows = this.renderTableData();

        return (
            <ReactTable
                className="-striped -highlight"
                columns={[{ Header: '', columns: this.renderParkingColumn() }]}
                noDataText="No Record Found"
                data={rows}
                pageSize={5}
                showPageSizeOptions={false}
                showPagination
            />
        );
    }

    render() {
        const {
            ticketNo, vehicleColor, vehicleMake, plateNo, spaceNo, vpaIn, city, commends,
        } = this.state;
        // xl / sm /  md /
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
                                                    <input type="text" className="form-control" name="ticketNo" value={ticketNo} onChange={(e) => { this.handleTicketNo(e); }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="test">
                                                  Plate No
                                                </label>
                                                <div className="controls">
                                                    <input type="text" className="form-control" id="plateNo" name="plateNo" value={plateNo} onChange={(e) => { this.handleChange('plateNo', e); }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="test">
                                                  Space No
                                                </label>
                                                <div className="controls">
                                                    <input type="text" className="form-control" name="spaceNo" value={spaceNo} onChange={(e) => { this.handleChange('spaceNo', e); }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="test">
                                                  Vehicle Make
                                                </label>
                                                <div className="controls">
                                                    <input type="text" className="form-control" name="vehicleMake" value={vehicleMake} onChange={(e) => { this.handleChange('vehicleMake', e); }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="test">
                                                  Vehicle Color
                                                </label>
                                                <div className="controls">
                                                    <input type="text" className="form-control" name="vehicleColor" value={vehicleColor} onChange={(e) => { this.handleChange('vehicleColor', e); }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="test">
                                                  Vpa In
                                                </label>
                                                <div className="controls">
                                                    <input type="text" className="form-control" name="vpaIn" value={vpaIn} onChange={(e) => { this.handleChange('vpaIn', e); }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="test">
                                                  City
                                                </label>
                                                <div className="controls">
                                                    <input type="text" className="form-control" name="city" value={city} onChange={(e) => { this.handleChange('city', e); }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="test">
                                                  Commends
                                                </label>
                                                <div className="controls">
                                                    <input type="text" className="form-control" name="commends" value={commends} onChange={(e) => { this.handleChange('commends', e); }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="test">
                                                  &nbsp;
                                                </label>
                                                <button type="button" className="btn btn-success" onClick={() => this.handleSubmit()}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="col-lg-12" style={{ display: 'flex' }}>
                                <section className="box col-md-6 ">
                                    <header className="panel_header">
                                        <h2 className="title pull-left">Requested List</h2>
                                    </header>
                                    <div className="content-body">
                                        <div className="row">
                                            <div className="col-md-12">

                                                {
                                                    this.renderRequestedTable()
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="box col-md-6 ">
                                    <header className="panel_header">
                                        <h2 className="title pull-left">Ontheway List</h2>
                                    </header>
                                    <div className="content-body">
                                        <div className="row">
                                            <div className="col-md-12">

                                                {
                                                    this.renderOnthewayTable()
                                                }


                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <section className="box col-xs-12 ">
                                <header className="panel_header">
                                    <h2 className="title pull-left">Parking List</h2>
                                </header>
                                <div className="content-body">
                                    <div className="row">
                                        <div className="col-md-12">

                                            {
                                                this.renderTable()
                                            }
                                            {
                                                this.renderRequestedModel()
                                            }
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

export default DashboardComponent;
