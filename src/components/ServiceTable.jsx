import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import lodashUniq from 'lodash.uniq';
import changeCase from 'change-case';

import 'react-table/react-table.css';

class ServiceTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRowIndex: null
    };
  }

  buildHeaders() {
    if (!this.props.data) {
      return [ { Header: "Loading...", accessor: null } ];
    }

    let keys = lodashUniq(this.props.data
      .map(obj => Object.keys(obj)
        .filter(k => typeof obj[k] !== 'object'))
      .reduce((acc, val) => acc.concat(val), []))

    let headers = keys.map(key => ({
      Header: changeCase.title(key),
      accessor: key
    }));

    return headers;
  }

  trSelector (state, rowInfo, column, instance) {
    return {
      onClick: (e, handleOriginal) => {
        if (this.props.onChange && this.state.selectedRowIndex !== rowInfo.index) {
          this.props.onChange(rowInfo.index);
        }

        this.setState({ selectedRowIndex: rowInfo.index });

        if (handleOriginal) {
          handleOriginal(e);
        }
      },
      style: {
        backgroundColor: rowInfo && this.state && this.state.selectedRowIndex === rowInfo.index ? "#def0f0" : null
      }
    };
  }

  render() {
    let columns = this.buildHeaders();
    return (
        <div className="card card-1">
          <ReactTable 
            getTrProps={this.trSelector.bind(this)}
            data={this.props.data}
            columns={columns}
            defaultPageSize={10}
            className="-striped -highlight"/>
        </div>
    );
  }
}

ServiceTable.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func
};

export default ServiceTable;
