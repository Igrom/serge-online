import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import cloneDeep from 'lodash.clonedeep';
import jp from 'jsonpath/jsonpath.min.js';

import DatePicker from './DatePicker';
import DropdownSelectArray from './DropdownSelectArray';

class OrdersItemDetails extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      item: this.props.item || {}
    };

    this.state.item.customer = this.state.item.customer || this.props.data.customers && this.props.data.customers[0] && this.props.data.customers[0]._links.self.href;
    this.state.item.products = this.state.item.products || [];
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
    let customerOptions = this.props.data && this.props.data.customers ?
      this.props.data.customers.map(v => (
        <option
          key={v._links.self.href}
          value={v._links.self.href}>
          {v.name}
        </option>
      )) : [];

    fields.push((
      <FormGroup>
        <ControlLabel>Customer</ControlLabel>
        <FormControl
          value={this.state.item.customer}
          componentClass='select'
          onChange={e => this.handleChange('$.customer', e)}>
            {customerOptions}
        </FormControl>
      </FormGroup>
    ));

    fields.push((
      <FormGroup>
        <ControlLabel>Expected by</ControlLabel>
        <FormControl
          selected={this.state.item.expectedBy}
          componentClass={DatePicker}
          onChange={date => this.handleChange('$.expectedBy', {
            target: {
              value: date._d.toISOString()
            }
          })}/>
      </FormGroup>
    ));

    fields.push((
      <DropdownSelectArray
        label="Products"
        data={this.state.item.products.map(v => ({
          value: v.product,
          count: v.quantity
        }))}
        options={this.props.data.products.map(v => ({
          value: v._links.self.href,
          label: v.name
        }))}
        onChange={arr => this.handleChange('$.products', {
          target: {
            value: arr.map(v => ({
              product: v.value,
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

OrdersItemDetails.propTypes = {
  data: PropTypes.object,
  item: PropTypes.object,

  onChange: PropTypes.func
};

export default OrdersItemDetails;
