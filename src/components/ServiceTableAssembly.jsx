import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ServiceTable from './ServiceTable.jsx';
import ServiceTableNavigator from './ServiceTableNavigator.jsx';

class ServiceTableAssembly extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRow: null
    };
  }

  handleAdd(e) {

  }

  handleModify(e) {

  }

  handleDelete(e) {

  }

  render() {
    return (
      <div className="ServiceTableAssembly">
        <ServiceTableNavigator
          className="ServiceTableAssembly-Navigator"
          noun={this.props.noun}/>
        <ServiceTable
          className="ServiceTableAssembly-Table"/>
      </div>
    );
  }
}

ServiceTableAssembly.propTypes = {
  supportAdd: PropTypes.bool,
  supportModify: PropTypes.bool,
  supportDelete: PropTypes.bool,
  noun: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string
  }).isRequired
};

export default ServiceTableAssembly;
