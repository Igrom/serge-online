import React from 'react';
import { Route, Link } from 'react-router-dom';
import ReactTable from 'react-table';
import lodashUniq from 'lodash.uniq';
import changeCase from 'change-case';

import 'react-table/react-table.css';

class ServiceTable extends React.Component {
  buildHeaders() {
    if (!this.props.data) {
      return [ { Header: "Loading...", accessor: null } ];
    }

    let keys = lodashUniq(this.props.data
      .map(obj => Object.keys(obj))
      .reduce((acc, val) => acc.concat(val)))

    let headers = keys.map(key => ({
      Header: changeCase.title(key),
      accessor: key
    }));

    return headers;
  }

  render() {
    let columns = this.buildHeaders();
    return (
        <div className="card card-1">
          <ReactTable 
            data={this.props.data}
            columns={columns}
            defaultPageSize={10}/>
        </div>
    );
  }
}

export default ServiceTable;
