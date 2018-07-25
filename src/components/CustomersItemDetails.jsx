import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import cloneDeep from 'lodash.clonedeep';
import jp from 'jsonpath/jsonpath.min.js';

class CustomersItemDetails extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      item: this.props.item || {}
    };

  }

  componentDidMount() {
    if (this.props.onChange) {
      this.props.onChange(this.state.item);
    }
  }

  handleChange(field, e) {
    let copy = cloneDeep(this.state.item);
    jp.value(copy, field, e.target.value);
    this.setState({
      item: copy
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(copy);
      }
    });
  }

  render() {
    let fields = [];

    fields.push((
      <FormControl
        type="text"
        value={this.state.item.name}
        placeholder="Name"
        onChange={e => this.handleChange('$.name', e)}
      />
    ));

    fields.push((
      <FormControl
        type="text"
        value={this.state.item.address}
        placeholder="Address"
        onChange={e => this.handleChange('$.address', e)}
      />
    ));

    fields.push((
      <FormControl
        type="text"
        value={this.state.item.email}
        placeholder="Email"
        onChange={e => this.handleChange('$.email', e)}
      />
    ));

    fields.push((
      <FormControl
        type="text"
        value={this.state.item.phone}
        placeholder="Phone"
        onChange={e => this.handleChange('$.phone', e)}
      />
    ));

    fields.push((
      <FormControl
        type="text"
        value={this.state.item.language}
        placeholder="language"
        onChange={e => this.handleChange('$.language', e)}
      />
    ));

    fields.push((
      <FormControl
        type="text"
        value={this.state.item.website}
        placeholder="website"
        onChange={e => this.handleChange('$.website', e)}
      />
    ));

    return (
      <form>
        {fields}
      </form>
    );
  }
}

CustomersItemDetails.propTypes = {
  data: PropTypes.object,
  item: PropTypes.object,

  onChange: PropTypes.func
};

export default CustomersItemDetails;
