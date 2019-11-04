import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import axios from 'axios';

import './index.scss';

/**
 * @class
 * @name City
 * @extends Component
 * @description City Component mounts at `/` route
 */
class CityComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityList: [],
            cityName: '',
        };
    }

    // eslint-disable-next-line class-methods-use-this
    // eslint-disable-next-line react/sort-comp
    renderColumn() {
        return ([
            {
                Header: 'City Name',
                accessor: 'cityName',
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
        const { cityList } = this.state;
        return cityList.map(e => ({
            cityName: e.cityName,
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
                showPageSizeOptions={false}
                pageSize={3}
                showPagination={false}
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
    handleCreateCity() {
        window.$('#cityCreate').modal('show');
    }

    // eslint-disable-next-line class-methods-use-this
    handleCloseModel() {
        this.setState({
            cityName: '',
        });
        window.$('#cityCreate').modal('hide');
    }

    handleSubmit() {
        const { cityName } = this.state;
        console.log('city: ', cityName);
    }

    renderModel() {
        const { cityName } = this.state;
        // xl / sm /  md /
        return (
            <div className="modal fade" id="cityCreate" tabIndex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="createcity" aria-hidden="true">
                <div className="modal-dialog modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create City</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => { this.handleCloseModel(); }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label">City Name</label>
                                        <div className="controls">
                                            <input type="text" className="form-control" name="cityName" value={cityName} onChange={(e) => { this.handleChange('cityName', e); }} />
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
                        <h2 className="title pull-left">City</h2>
                        <div className="actions panel_actions pull-right">
                            <button type="submit" className="btn btn-success" onClick={() => { this.handleCreateCity(); }}>Add City</button>
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

export default CityComponent;
