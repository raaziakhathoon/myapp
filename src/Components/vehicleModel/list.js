import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import axios from 'axios';

import './index.scss';

/**
 * @class
 * @name vehicleModel
 * @extends Component
 * @description vehicleModel Component mounts at `/` route
 */
class vehicleModelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleModelList: [],
            vehicleModelName: '',
        };
    }

    async componentDidMount() {
        const { data } = await axios.get(`${ process.env.API_URI }/vehicleModel`);
        this.setState({
            vehicleModelList: data,
        });
    }

    // eslint-disable-next-line class-methods-use-this
    // eslint-disable-next-line react/sort-comp
    renderColumn() {
        return ([
            {
                Header: 'vehicle Model',
                accessor: 'vehicleModel',
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
        const { vehicleModelList } = this.state;
        return vehicleModelList.map(e => ({
            vehicleModel: e.vehicleModel,
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
    handleCreatevehicleModel() {
        window.$('#vehicleModelCreate').modal('show');
    }

    // eslint-disable-next-line class-methods-use-this
    handleCloseModel() {
        this.setState({
            vehicleModelName: '',
        });
        window.$('#vehicleModelCreate').modal('hide');
    }

    async handleSubmit() {
        const { vehicleModelName } = this.state;
        // eslint-disable-next-line no-console
        console.log('vehicleModel: ', vehicleModelName);

        await axios.post(`${ process.env.API_URI }/vehicleModel`, { vehicleModel: vehicleModelName });
        const { data } = await axios.get(`${ process.env.API_URI }/vehicleModel`);
        this.setState({
            vehicleModelList: data,
        });
        window.$('#vehicleModelCreate').modal('hide');
    }

    renderModel() {
        const { vehicleModelName } = this.state;
        // xl / sm /  md /
        return (
            <div className="modal fade" id="vehicleModelCreate" tabIndex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="createvehicleModel" aria-hidden="true">
                <div className="modal-dialog modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create vehicleModel</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => { this.handleCloseModel(); }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label">Vehicle Model</label>
                                        <div className="controls">
                                            <input type="text" className="form-control" name="vehicleModelName" value={vehicleModelName} onChange={(e) => { this.handleChange('vehicleModelName', e); }} />
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
        const { match } = this.props;
        return (
            <div className="col-lg-12">
                <section className="box ">
                    <header className="panel_header">
                        <h2 className="title pull-left">vehicleModel</h2>
                        <div className="actions panel_actions pull-right">
                            <button type="submit" className="btn btn-success" onClick={() => { this.handleCreatevehicleModel(); }}>Add vehicleModel</button>
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

export default vehicleModelComponent;
