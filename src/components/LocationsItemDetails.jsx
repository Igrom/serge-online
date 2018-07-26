import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import cloneDeep from 'lodash.clonedeep';
import jp from 'jsonpath/jsonpath.min.js';

import DatePicker from './DatePicker';
import DropdownSelectArray from './DropdownSelectArray';

class LocationsItemDetails extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      item: this.props.item || {}
    };

    this.state.item.order = this.state.item.order || this.props.data.orders && this.props.data.orders[0] && this.props.data.orders[0]._links.self.href;
    this.state.item.stock = this.state.item.stock || [];
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
    let orderOptions = this.props.data && this.props.data.orders ?
      this.props.data.orders.map(v => (
        <option
          key={v._links.self.href}
          value={v._links.self.href}>
          {v._links.self.href}
        </option>
      )) : [];

    fields.push((
      <FormControl
        type="text"
        value={this.state.item.code}
        placeholder="Code"
        onChange={e => this.handleChange('$.code', e)}
      />
    ));

    fields.push((
      <FormGroup>
        <ControlLabel>Order</ControlLabel>
        <FormControl
          value={this.state.item.order}
          componentClass='select'
          onChange={e => this.handleChange('$.order', e)}>
            {orderOptions}
        </FormControl>
      </FormGroup>
    ));

    fields.push((
      <DropdownSelectArray
        label="Stock"
        data={this.state.item.stock.map(v => ({
          value: v.stock,
          count: v.quantity
        }))}
        options={this.props.data.stock.map(v => ({
          value: v._links.self.href,
          label: v._links.self.href
        }))}
        onChange={arr => this.handleChange('$.stock', {
          target: {
            value: arr.map(v => ({
              stock: v.value,
              quantity: v.count
            }))
          }
        })}/>
    ));

    return (
      <form>
        {fields}
      </form>
    );
  }
}

LocationsItemDetails.propTypes = {
  data: PropTypes.object,
  item: PropTypes.object,

  onChange: PropTypes.func
};

export default LocationsItemDetails;
