import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import ServiceTableAssembly from './ServiceTableAssembly';

class ServiceView extends React.Component {
  render() {
    return (
      <div className="ServiceView">
        <center>
          <ServiceTableAssembly
            data={this.props.data}
            noun={this.props.noun}
            client={this.props.client}/>
        </center>
      </div>
    );
  }
}

ServiceView.propTypes = {
  data: PropTypes.object,
  client: PropTypes.object,
  noun: PropTypes.object
};

export default ServiceView;
