import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormGroup, FormControl } from 'react-bootstrap';

class ServiceItemDetails extends React.Component {
  buildForm() {
    let definitions = this.props.definitions;
    let mainDefinition = definitions[this.props.mainDefinition];
    let fields = [];

    Object.keys(mainDefinition.properties)
      .map(k => {
        let property = mainDefinition.properties[k];
        let isRequired = mainDefinition.required.includes(k);

        if (property.type === "string" && property.format === "uri") {
          let options = this.props.data[Object.keys(this.props.data).find(i => i.match(k))]
            .map(d => (
              <option value={d._links.self}>d._links.self</option>
            ));
          return (
            <FormControl
              componentClass="select" placeholder="select">
                ...options
            </FormControl>
          );
        }

        if (property.type === "string") {
          return (
            <FormControl
              type="text"
            />
          );
        }

      });
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

ServiceItemDetails.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func
};

export default ServiceItemDetails;
